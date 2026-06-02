import { participantImages, workshopImages } from "./images";

export const workshops = [
  {
    title: "Collage Therapy Workshop",
    description:
      "Express your emotions and creativity through collage and mixed media art.",
    category: "Collage",
    duration: "2 Hours",
    level: "Beginner",
    date: "June 12, 2026",
    image: workshopImages.collage,
  },
  {
    title: "Acrylic Painting Session",
    description:
      "Relax and enjoy guided painting exercises in a mindful environment.",
    category: "Painting",
    duration: "3 Hours",
    level: "All Levels",
    date: "June 18, 2026",
    image: workshopImages.painting,
  },
  {
    title: "Carving on Gypsum",
    description:
      "Learn hand-carving techniques on gypsum blocks to create textured reliefs and small sculptures.",
    category: "Carving",
    duration: "3 Hours",
    level: "Intermediate",
    date: "June 21, 2026",
    image: workshopImages.gypsum,
  },
  {
    title: "Kids Creative Day",
    description:
      "Fun art activities designed to inspire imagination and creativity in children.",
    category: "Kids",
    duration: "4 Hours",
    level: "Kids",
    date: "June 25, 2026",
    image: workshopImages.kids,
  },
  {
    title: "Mindful Drawing Session",
    description:
      "Slow down and reconnect with yourself through calming drawing exercises.",
    category: "Mindfulness",
    duration: "2 Hours",
    level: "All Levels",
    date: "July 2, 2026",
    image: workshopImages.mindfulDrawing,
  },
  {
    title: "Vitray Art Workshop",
    description:
      "Discover the luminous craft of vitray by painting glass-inspired designs with translucent color and light.",
    category: "Painting",
    duration: "3 Hours",
    level: "Intermediate",
    date: "July 8, 2026",
    image: workshopImages.vitray,
  },
];

export const categories = ["All", "Painting", "Collage", "Journaling", "Kids", "Mindfulness"];

export const featuredWorkshops = workshops.slice(0, 4);

export const galleryImages = [
    {
    id: 1,
    image: workshopImages.collageKids,
    title: "Collage Art Workshop",
    category: "Collage",
  },
  {
    id: 2,
    image: workshopImages.cups,
    title: "Painting Therapy Session",
    category: "Vitray Art on Cups",
  },
  {
    id: 3,
    image: workshopImages.participants,
    title: "Creative Participants",
    category: "Vitray Workshop",
  },
  {
    id: 4,
    image: workshopImages.angela,
    title: "Kids Creative Day",
    category: "Kids",
  },
  {
    id: 5,
    image: workshopImages.preparation,
    title: "Workshop Preparation",
    category: "Carving Workshop",
  },
  {
    id: 6,
    image: workshopImages.results,
    title: "Creative Results",
    category: "Carving",
  },
];

export const testimonials = [
  {
    id: 1,
    name: "Lara M.",
    role: "Collage Workshop Participant",
    text: "I came in feeling burnt out and left feeling genuinely lighter. The collage session was more therapeutic than I expected. I've already signed up for the next one.",
    rating: 5,
    avatar: participantImages.artist,
  },
  {
    id: 2,
    name: "Rami K.",
    role: "Painting Therapy Participant",
    text: "No judgment, no pressure — just you and a canvas. The instructor made everyone feel capable regardless of skill. Exactly what I needed after a tough month.",
    rating: 5,
    avatar: participantImages.painter,
  },
  {
    id: 3,
    name: "Nour S.",
    role: "Kids Creative Day Parent",
    text: "My daughter hasn't stopped talking about it. She came home with the biggest smile and a piece of art she's now hung on her wall. We'll be back every month.",
    rating: 5,
    avatar: participantImages.creative,
  },
];

export const stats = [
  { value: 40, label: "Workshops Held", suffix: "+" },
  { value: 500, label: "Participants", suffix: "+" },
  { value: 120, label: "Art Sessions", suffix: "+" },
  { value: 300, label: "Community Members", suffix: "+" },
];

export const faqs = [
  {
    question: "Who can join the workshops?",
    answer: "Everyone is welcome — absolute beginners, casual creatives, and experienced artists alike. Our sessions are designed to meet you where you are, with no prior experience required.",
  },
  {
    question: "Are art materials included?",
    answer: "Yes! All materials are provided for every workshop. Just bring yourself and an open mind. We take care of canvases, paints, collage supplies, and everything in between.",
  },
  {
    question: "Are kids workshops available?",
    answer: "Absolutely. Our Kids Creative Day sessions are designed for children aged 6–12, with age-appropriate activities and a nurturing, playful environment.",
  },
  {
    question: "How do I register for a workshop?",
    answer: "You can register directly through the Workshops page using our registration form. Select your workshop, fill in your details, and you're set. We'll send a confirmation email within 24 hours.",
  },
  {
    question: "Can I cancel or reschedule?",
    answer: "Yes. We ask for at least 48 hours notice for cancellations or rescheduling. Reach out via email or our contact form and we'll sort it out.",
  },
];
