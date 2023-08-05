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