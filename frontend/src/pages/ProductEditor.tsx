import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { productService } from '../services/api';
import AdminHeader from '../components/AdminHeader';
import './ProductEditor.css';

interface ProductData {
    id?: string;
    title: string;
    category: string;
    categoryId: string;
    menuId: string;
    groupId: string;
    slug: string;
    image: string;
    description: string;
    priceLabel?: string;
    features: any[];
    specs: Record<string, string>;
    gallery: string[];
    technicalDocs?: any[];
}

interface ProductEditorProps {
    product?: ProductData | null;
    onSave?: (product: ProductData) => void;
    onCancel?: () => void;
}

const ProductEditor: React.FC<ProductEditorProps> = ({ product: propProduct, onSave: propOnSave, onCancel: propOnCancel }) => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(!!id && !propProduct);
    const [formData, setFormData] = useState<ProductData>(propProduct || {
        title: '',
        category: '',
        categoryId: '',
        menuId: '',
        groupId: '',
        slug: '',
        image: '',
        description: '',
        features: [],
        specs: {},
        gallery: [],
    });

    useEffect(() => {
        if (id && !propProduct) {
            setLoading(true);
            productService.getById(id)
                .then(data => {
                    setFormData({
                        ...data,
                        features: data.features || [],
                        specs: data.specs || {},
                        gallery: data.gallery || [],
                    });
                    setLoading(false);
                })
                .catch(err => {
                    console.error(err);
                    setLoading(false);
                });
        }
    }, [id, propProduct]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleFeatureChange = (index: number, value: string) => {
        const newFeatures = [...formData.features];
        newFeatures[index] = value;
        setFormData(prev => ({ ...prev, features: newFeatures }));
    };

    const addFeature = () => {
        setFormData(prev => ({ ...prev, features: [...prev.features, ''] }));
    };

    const removeFeature = (index: number) => {
        setFormData(prev => ({ ...prev, features: prev.features.filter((_, i) => i !== index) }));
    };

    const handleSpecChange = (key: string, value: string, oldKey?: string) => {
        const newSpecs = { ...formData.specs };
        if (oldKey && oldKey !== key) {
            delete newSpecs[oldKey];
        }
        newSpecs[key] = value;
        setFormData(prev => ({ ...prev, specs: newSpecs }));
    };

    const addSpec = () => {
        setFormData(prev => ({ ...prev, specs: { ...prev.specs, '': '' } }));
    };

    const removeSpec = (key: string) => {
        const newSpecs = { ...formData.specs };
        delete newSpecs[key];
        setFormData(prev => ({ ...prev, specs: newSpecs }));
    };

    const [errors, setErrors] = useState<Record<string, string>>({});

    const validate = () => {
        const newErrors: Record<string, string> = {};
        if (!formData.title) newErrors.title = 'Title is required';
        if (!formData.slug) newErrors.slug = 'Slug is required';
        else if (!/^[a-z0-9-]+$/.test(formData.slug)) newErrors.slug = 'Slug must be lowercase alphanumeric with hyphens';

        if (!formData.categoryId) newErrors.categoryId = 'Category ID is required';
        if (!formData.image) newErrors.image = 'Feature image is required';

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (validate()) {
            if (propOnSave) {
                propOnSave(formData);
            } else {
                try {
                    if (id || formData.id) {
                        await productService.update((id || formData.id)!, formData);
                    } else {
                        await productService.create(formData);
                    }
                    navigate('/admin/products');
                } catch (err) {
                    alert('Failed to save product');
                }
            }
        }
    };

    const handleCancel = () => {
        if (propOnCancel) {
            propOnCancel();
        } else {
            navigate('/admin/products');
        }
    };

    if (loading) return <div className="admin-loading">LOADING PRODUCT DATA...</div>;

    const isOverlay = !!propOnSave;

    return (
        <div className={isOverlay ? "product-editor-overlay" : "product-editor-page"}>
            {!isOverlay && <AdminHeader />}
            <div className={isOverlay ? "product-editor-container" : "editor-content-area"}>
                <div className={isOverlay ? "" : "product-editor-container"}>
                    <header className="editor-header">
                        <h2>{(id || formData.id) ? 'Edit Product' : 'New Product'}</h2>
                        <button onClick={handleCancel} className="close-btn">×</button>
                    </header>

                    <form onSubmit={handleSubmit} className="editor-form">
                        <div className="form-grid">
                            <div className="form-section">
                                <h3>Basic Info</h3>
                                <div className="input-group">
                                    <label>Title</label>
                                    <input name="title" value={formData.title} onChange={handleChange} required placeholder="Product Title" className={errors.title ? 'error' : ''} />
                                    {errors.title && <span className="error-text">{errors.title}</span>}
                                </div>
                                <div className="input-group">
                                    <label>Slug</label>
                                    <input name="slug" value={formData.slug} onChange={handleChange} required placeholder="product-slug" className={errors.slug ? 'error' : ''} />
                                    {errors.slug && <span className="error-text">{errors.slug}</span>}
                                </div>
                                <div className="input-row">
                                    <div className="input-group">
                                        <label>Category</label>
                                        <input name="category" value={formData.category} onChange={handleChange} required />
                                    </div>
                                    <div className="input-group">
                                        <label>Category ID</label>
                                        <input name="categoryId" value={formData.categoryId} onChange={handleChange} required />
                                    </div>
                                </div>
                                <div className="input-row">
                                    <div className="input-group">
                                        <label>Menu ID</label>
                                        <input name="menuId" value={formData.menuId} onChange={handleChange} required />
                                    </div>
                                    <div className="input-group">
                                        <label>Group ID</label>
                                        <input name="groupId" value={formData.groupId} onChange={handleChange} required />
                                    </div>
                                </div>
                            </div>

                            <div className="form-section">
                                <h3>Media & Content</h3>
                                <div className="input-group">
                                    <label>Main Image URL</label>
                                    <input name="image" value={formData.image} onChange={handleChange} required />
                                </div>
                                <div className="input-group">
                                    <label>Description</label>
                                    <textarea name="description" value={formData.description} onChange={handleChange} required rows={4} />
                                </div>
                                <div className="input-group">
                                    <label>Price Label</label>
                                    <input name="priceLabel" value={formData.priceLabel} onChange={handleChange} placeholder="e.g. $1,200.00 or Price on Request" />
                                </div>
                            </div>
                        </div>

                        <div className="form-section full-width">
                            <div className="section-header">
                                <h3>Gallery Images</h3>
                                <button type="button" onClick={() => setFormData(prev => ({ ...prev, gallery: [...prev.gallery, ''] }))} className="add-small-btn">+ Add Image</button>
                            </div>
                            <div className="gallery-list">
                                {formData.gallery.map((img, index) => (
                                    <div key={index} className="list-item">
                                        <input value={img} onChange={(e) => {
                                            const newGallery = [...formData.gallery];
                                            newGallery[index] = e.target.value;
                                            setFormData(prev => ({ ...prev, gallery: newGallery }));
                                        }} placeholder="Image URL" />
                                        <button type="button" onClick={() => setFormData(prev => ({ ...prev, gallery: prev.gallery.filter((_, i) => i !== index) }))} className="remove-btn">-</button>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="form-section full-width">
                            <div className="section-header">
                                <h3>Features</h3>
                                <button type="button" onClick={addFeature} className="add-small-btn">+ Add</button>
                            </div>
                            <div className="features-list">
                                {formData.features.map((feature, index) => (
                                    <div key={index} className="list-item">
                                        <input value={feature} onChange={(e) => handleFeatureChange(index, e.target.value)} placeholder="Feature description" />
                                        <button type="button" onClick={() => removeFeature(index)} className="remove-btn">-</button>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="form-section full-width">
                            <div className="section-header">
                                <h3>Technical Specs</h3>
                                <button type="button" onClick={addSpec} className="add-small-btn">+ Add</button>
                            </div>
                            <div className="specs-list">
                                {Object.entries(formData.specs || {}).map(([key, value], index) => (
                                    <div key={index} className="list-item">
                                        <input value={key} onChange={(e) => handleSpecChange(e.target.value, value as string, key)} placeholder="Label" />
                                        <input value={value as string} onChange={(e) => handleSpecChange(key, e.target.value)} placeholder="Value" />
                                        <button type="button" onClick={() => removeSpec(key)} className="remove-btn">-</button>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <footer className="editor-footer">
                            <button type="button" onClick={handleCancel} className="cancel-btn">CANCEL</button>
                            <button type="submit" className="save-btn">SAVE CHANGES</button>
                        </footer>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default ProductEditor;
