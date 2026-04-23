# Inspiration Reference Workflow

The file `inspiration.png` at the project root is the visual target for this build. It is the design reference for every UI decision.

## Standing Instructions

- **Before starting any UI task**, read `inspiration.png` to understand what we are building toward.
- **After implementing any visible UI feature**, take a screenshot of the running app and compare it side by side with `inspiration.png`. Report:
  1. What matches — layout, spacing, typography, color, motion.
  2. What diverges — anything that looks different from the reference.
  3. What is next — the closest gap to close in the next step.
- Never mark a UI feature complete without doing this comparison.
- Use the comparison to drive the order of work: always close the biggest visual gap first.

## How to Take a Screenshot

Run the dev server (`npm run dev`) if it is not already running, then use the browser screenshot tool or capture the viewport manually and load the image for comparison. Both images (`inspiration.png` and the screenshot) should be viewed together before reporting progress.
