// dragAndDrop.spec.ts
import { test } from '@playwright/test';
import { DragAndDrop } from '../../pageObject/LambdaTest/Solutions/DragAndDrop';

test.describe('DRAG AND DROP', () => {
  test('drag and drop', async ({ page }) => {
    const dragAndDrop = new DragAndDrop(page);

    // Navigate to the test page
    const url = process.env.LAMBDA
      ? `${process.env.LAMBDA}/selenium-playground/drag-and-drop-demo`
      : 'https://www.lambdatest.com/selenium-playground/drag-and-drop-demo';
    await page.goto(url);

    // Perform drag-and-drop tests
    await dragAndDrop.dragAndDropElement('Draggable 1');
    await dragAndDrop.dragAndDropElement('Draggable 2');

    // Reload the page and repeat using alternative method
    await page.reload();
    await dragAndDrop.dragAndDropElementOption2('Draggable 1');
    await dragAndDrop.dragAndDropElementOption2('Draggable 2');
    console.log('LAMBDA Environment Variable:', process.env.LAMBDA);

  });
});
