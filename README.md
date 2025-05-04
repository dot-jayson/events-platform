# 🎉 Events Platform

A simple events platform that allows users to browse, sign up for, and add events to their Google Calendar.

Built with:

- **React** (with **TypeScript**) for the frontend
- **Firebase** for backend services including authentication and database
- **Google Calendar API** for calendar integration

**Live App:** [jaysonevents.netlify.app](https://jaysonevents.netlify.app/)

---

## 🔐 Getting Started

1. When you visit the site, you'll land on the **Authentication page**.
2. Click **"Create an account"**, fill in the form, and then click **"Sign Up"**.
3. After signing up, you'll be redirected to the **Home page**.

## 🗓️ Browsing Events

- On the **Home page**, you can view all upcoming events, ordered by date.
- Click **"See More"** on any event card to view its full details.
- To **sign up** for an event, click the **"Sign Up"** button on the event detail page.
- Head to the **"My Events"** tab to view events you've signed up for.

## 📅 Add Events to Google Calendar

1. On the **"My Events"** page, click **"Add to Calendar"** for any event.
2. A Google Sign-In window will pop up.
3. Choose the Google account you wish to use.
4. You may see a warning — click **"Advanced"**.
5. Click **"Go to jaysonevents.netlify.app (unsafe)"**, then proceed.
6. The event will now be added to your **Google Calendar**.

## ✍️ Adding New Events (Staff Only)

To add events, you must log in with a **staff account**:

- **Username:** `testevents777@gmail.com`
- **Password:** `staff123`

Once logged in:

1. You'll see a **"Create Event"** tab appear in the navigation bar.
2. Click on it and fill in the form. (For the image, provide a valid image URL.)
3. Click **"Create Event"**.
4. You’ll be redirected to the **Home page**, and your new event will be visible.
