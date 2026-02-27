# Rollback Instructions

If you wish to revert to the previous Hero implementation:

1.  Open `d:\powerfill\src\App.tsx`.
2.  Replace the `CinematicBatteryHero` import with `Hero`:
    ```tsx
    // Remove
    import CinematicBatteryHero from './components/CinematicBatteryHero';
    // Add back
    import Hero from './components/Hero';
    ```
3.  Update the `HomePage` component in `App.tsx` to use `<Hero />` instead of `<CinematicBatteryHero />`.

No files were deleted, so the original code remains intact.
