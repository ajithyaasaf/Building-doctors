# Building Doctor Website

A professional digital platform for OM Vinayaga Associates (Building Doctor franchise) that provides comprehensive construction repair services with an intuitive and modern user experience.

## Features

- Responsive design optimized for all devices
- Product catalog with detailed product pages
- Service listings with detailed information
- Admin dashboard for managing content
- Contact and inquiry forms integration with Firebase
- Building issue diagnosis and solution workflows

## Tech Stack

- Frontend: React.js, TailwindCSS, Shadcn UI
- Backend: Express.js, Firebase Realtime Database
- State Management: React Query
- Routing: Wouter
- Animation: Framer Motion
- Form Handling: React Hook Form with Zod validation

## Project Structure

- client/ - Frontend React application
- server/ - Backend Express application
- shared/ - Shared code between client and server

## Deployment on Vercel

1. Fork this repository to your GitHub account
2. Create a new project on Vercel 
3. Link your GitHub repository
4. Configure environment variables for Firebase credentials
5. Deploy!

## Admin Access

Access the admin dashboard at /admin with the following credentials:
- Username: admin
- Password: buildingdoctor2023

## Firebase Setup

1. Create a Firebase project
2. Set up Realtime Database
3. Update Firebase configuration in server/firebase.ts and client/src/lib/firebase.js

## License

MIT
