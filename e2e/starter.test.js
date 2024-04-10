describe('Example', () => {
  beforeAll(async () => {
    await device.launchApp();
  });

  beforeEach(async () => {
    await device.reloadReactNative();
  });

  it('should fail at some point', async () => {

    while(true) {
      await element(by.id("detox-show-react-modal-button")).tap()
      await element(by.id("detox-show-navigation-modal-button")).tap()
      await waitFor(element(by.id("detox-hide-navigation-modal-button"))).toBeVisible().withTimeout(10000);
      await element(by.id("detox-hide-navigation-modal-button")).tap()
    }
  
  });

});
