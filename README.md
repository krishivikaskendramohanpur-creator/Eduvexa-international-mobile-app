EDUVEXA INTERNATIONAL — ANDROID + iOS APP SOURCE

This is an Expo / React Native starter project.

Included:
- Branded sign-in and registration screens
- Demo student dashboard
- Course/destination explorer
- Study application enquiry UI
- Document preparation checklist
- Official visa information links
- WhatsApp and email contact shortcuts
- Android and iOS app configuration

IMPORTANT PROTOTYPE LIMITATIONS
- Authentication is demo-only and held in app memory.
- Application records and checklist selections are not persisted or synced.
- No backend, secure document upload, admin web portal, or push notifications are connected.
- Do not enter real passwords, passport details, or sensitive documents.
- The app is not yet ready for public production or app-store release.

RUN LOCALLY
1. Install Node.js (LTS) and Expo tooling.
2. Extract this ZIP.
3. In the project folder run: npm install
4. Run: npx expo start
5. Install Expo Go on a test phone and scan the QR code, or use an Android/iOS simulator.

BUILD INSTALLABLE PACKAGES
1. Create an Expo account and install EAS CLI: npm install -g eas-cli
2. Sign in: eas login
3. Configure: eas build:configure
4. Android preview build: eas build --platform android --profile preview
5. iOS preview build: eas build --platform ios --profile preview
6. Store release builds require the relevant developer accounts, signing and store review.

BRANDING / CONTACT
Business: Eduvexa International
Tagline: Your Future. Beyond Borders.
WhatsApp: +91 96390 02254
Email: eduvexa.international@gmail.com
Office: Puranpur, Pilibhit, Uttar Pradesh, India

NEXT PRODUCTION STEPS
- Integrate managed authentication (e.g. Supabase Auth or Firebase Auth).
- Add a secure database with server-side role-based access control.
- Add private document storage with upload limits, malware scanning and access rules.
- Build a protected staff/admin dashboard.
- Add privacy policy, consent, retention and account deletion workflows.
- Test security, accessibility, device layouts and app-store compliance.


ANDROID APK BUILD (CLOUD)
1. Install Node.js LTS on a computer.
2. Extract this project ZIP and open a terminal in the project folder.
3. Run: npm install
4. Run: npm install -g eas-cli
5. Run: eas login  (create/sign in to an Expo account)
6. Run: eas build --platform android --profile preview
7. Wait for the cloud build to finish; open the build URL from EAS and download the APK.
The preview profile is configured for an installable APK. A production Play Store build uses an Android App Bundle (AAB).
