import { APP_CONFIG } from './config';

export interface AdWatchResult {
  completed: boolean;
  rewardSwipesGranted: number;
  rewardToken?: string;
  error?: string;
}

export class MockRewardedAdService {
  private isShowingAd: boolean = false;

  public async isAdAvailable(): Promise<boolean> {
    // In mock mode, ad is always available
    return true;
  }

  public async showAd(
    onProgress: (remainingSeconds: number) => void
  ): Promise<AdWatchResult> {
    if (this.isShowingAd) {
      return { completed: false, rewardSwipesGranted: 0, error: 'Ad session already active.' };
    }

    this.isShowingAd = true;
    let secondsLeft = APP_CONFIG.MOCK_AD_DURATION_SECONDS;

    return new Promise((resolve) => {
      onProgress(secondsLeft);
      
      const interval = setInterval(() => {
        secondsLeft -= 1;
        onProgress(secondsLeft);

        if (secondsLeft <= 0) {
          clearInterval(interval);
          this.isShowingAd = false;
          resolve({
            completed: true,
            rewardSwipesGranted: APP_CONFIG.REWARDED_AD_SWIPES,
            rewardToken: `mock_signed_token_${Date.now()}`
          });
        }
      }, 1000);
    });
  }

  public cancelAd(): AdWatchResult {
    this.isShowingAd = false;
    return {
      completed: false,
      rewardSwipesGranted: 0,
      error: 'Ad was skipped before completion. Reward not granted.'
    };
  }
}

export const adService = new MockRewardedAdService();
