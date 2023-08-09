# React Native ExpoでStable Diffusionを使うサンプル

ブログ記事

[React NativeでStable Diffusionを使う](https://retwpay.ml/blog/2023-08-09)

[React Native(Expo)でStable Diffusionを使う](https://qiita.com/votepurchase/items/6bef1cca08bf2833e47b?utm_campaign=post_article&utm_medium=twitter&utm_source=twitter_share)

// build: develop
eas build --profile development --platform ios
eas build --profile development --platform android

// build: internal
eas build --profile preview --platform ios
eas build --profile preview --platform android

// build: production
eas build --profile production --platform ios
eas build --profile production --platform android

// OTA update
eas update --channel internal --message "Updating the app"
eas update --channel production --message "Updating the app"

// iOS: Setting up ad hoc provisioning
eas device:create
// list all registered devices for your account
eas device:list

arch -x86_64 npx expo prebuild
arch -x86_64 yarn ios
arch -x86_64 npx expo run:ios --device