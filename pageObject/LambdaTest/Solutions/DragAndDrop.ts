import { Page, Locator, expect } from '@playwright/test';

export class DragAndDrop {
  private readonly page: Page;
  private readonly dragEl: Locator;
  private readonly dragEl2: Locator;
  private readonly dropZone: Locator;
  private readonly dropZone2: Locator;
  private readonly dropList: Locator;

  constructor(page: Page) {
    this.page = page;
    this.dragEl = page.locator('[draggable="true"]');
    this.dropZone = page.locator('#mydropzone');
    this.dropList = page.locator('#droppedlist');
    this.dragEl2 = page.locator('#draggable');
    this.dropZone2 = page.locator('#droppable');

  }

  /**
   * Perform drag-and-drop using Playwright's dragTo method.
   * @param text - Text content of the element to drag.
   */

  public async dragAndDropElement(text: string): Promise<void> {
    const dragSource = this.dragEl.filter({hasText: text});
    await dragSource.dragTo(this.dropZone);
    await this.verifyDrop(text);
  }

  /**
   * Perform drag-and-drop using manual mouse events.
   * @param text - Text content of the element to drag.
   */
  public async dragAndDropElementOption2(text: string): Promise<void> {
    const dragSource = this.dragEl.filter({hasText: text});
    await dragSource.hover();
    await this.page.mouse.down();
    await this.dropZone.hover();
    await this.page.mouse.up();
    await this.verifyDrop(text);
  }

  /**
   * Verify that the dragged element's text appears in the drop list.
   * @param text - Text to verify in the drop list.
   */
  private async verifyDrop(text: string): Promise<void> {
    const dropListText = await this.dropList.textContent();
    expect(dropListText).toContain(text);
  }


  /**
   * Verify the background color and text of the second drop zone.
   * @param expectedText - Text to verify in the drop zone.
   * @param expectedColor - Expected background color of the drop zone.
   */
  public async verifyDropZone2(expectedText: string, expectedColor: string): Promise<void> {
    // Verify the text content
    const dropZoneText = await this.dropZone2.textContent();
    expect(dropZoneText).toContain(expectedText);

    // Verify the background color
    const backgroundColor = await this.dropZone2.evaluate((element) => {
      return window.getComputedStyle(element).backgroundColor;
    });
    expect(backgroundColor).toBe(expectedColor);

    // Log for debugging
    console.log(`Verification passed: Drop zone has text "${expectedText}" and color "${backgroundColor}".`);
  }

  /**
   * Perform drag-and-drop to the second drop zone and verify changes.
   */
  public async dragAndDropToDropZone2(): Promise<void> {
    await this.dragEl2.dragTo(this.dropZone2);
  }


  public async dragAndDropToDropZone2Option2(text: string, expectedText: string, expectedColor: string): Promise<void> {
    // Filter the draggable element by text
    const dragSource = this.dragEl2.filter({ hasText: text });

    // Perform manual drag-and-drop using mouse events
    await dragSource.hover();
    await this.page.mouse.down();
    await this.dropZone2.hover(); // Hover over dropZone2 (correct drop zone)
    await this.page.mouse.up();

    // Verify the text and background color of dropZone2
    await this.verifyDropZone2(expectedText, expectedColor);
  }
}



