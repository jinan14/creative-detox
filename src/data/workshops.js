import { participantImages, workshopImages } from "./images";

export const workshops = [
  {
    id: 1,
    title: "Collage Therapy Workshop",
    description: "Cut, layer, and compose your emotions into beautiful collages. No artistic experience needed — just scissors, glue, and an open heart.",
    category: "Collage",
    duration: "3 hours",
    difficulty: "Beginner",
    date: "June 14, 2025",
    image: workshopImages.collage,
    spots: 12,
  },
  {
    id: 2,
    title: "Acrylic Painting Session",
    description: "Explore bold color and texture on canvas. Our instructors guide you through layering, blending, and finding your own painting voice.",
    category: "Painting",
    duration: "4 hours",
    difficulty: "All Levels",
    date: "June 21, 2025",
    image: workshopImages.painting,
    spots: 8,
  },
  {
    id: 3,
    title: "Art Journaling Workshop",
    description: "Transform a blank notebook into a visual diary. Combine writing, drawing, and mixed media to process thoughts and spark creativity.",
    category: "Journaling",
    duration: "2.5 hours",
    difficulty: "Beginner",
    date: "June 28, 2025",
    image: workshopImages.journaling,
    spots: 15,
  },
  {
    id: 4,
    title: "Kids Creative Day",
    description: "A colorful adventure for little artists! Kids explore painting, crafts, and storytelling through art in a joyful, supportive environment.",
    category: "Kids",
    duration: "2 hours",
    difficulty: "Kids (6–12)",
    date: "July 5, 2025",
    image: workshopImages.kids,
    spots: 20,
  },
  {
    id: 5,
    title: "Mindful Drawing Session",
    description: "Slow down and draw with intention. This session blends mindfulness meditation with focused drawing exercises to quiet the mental noise.",
    category: "Mindfulness",
    duration: "2 hours",
    difficulty: "All Levels",
    date: "July 12, 2025",
    image: workshopImages.mindfulDrawing,
    spots: 10,
  },
  {
    id: 6,
    title: "Mixed Media Exploration",
    description: "No rules, all textures. This workshop invites you to mix paint, paper, fabric, and found objects into expressive layered artworks.",
    category: "Collage",
    duration: "3.5 hours",
    difficulty: "Intermediate",
    date: "July 19, 2025",
    image: workshopImages.mixedMedia,
    spots: 10,
  },
];

export const categories = ["All", "Painting", "Collage", "Journaling", "Kids", "Mindfulness"];

export const featuredWorkshops = workshops.slice(0, 4);

export const galleryImages = [
  {
    id: 1,
    src: workshopImages.collage,
    alt: "Collage art workshop",
    category: "Workshop",
    span: "row-span-2",
  },
  {
    id: 2,
    src: workshopImages.painting,
    alt: "Painting session",
    category: "Art",
    span: "",
  },
  {
    id: 3,
    src: workshopImages.journaling,
    alt: "Art journaling",
    category: "Journaling",
    span: "",
  },
  {
    id: 4,
    src: workshopImages.kids,
    alt: "Kids workshop",
    category: "Kids",
    span: "col-span-2",
  },
  {
    id: 5,
    src: workshopImages.heroWorkshop,
    alt: "Community creative session",
    category: "Community",
    span: "",
  },
  {
    id: 6,
    src: workshopImages.mixedMedia,
    alt: "Mixed media art",
    category: "Art",
    span: "row-span-2",
  },
  {
    id: 7,
    src: workshopImages.mindfulDrawing,
    alt: "Mindful drawing",
    category: "Mindfulness",
    span: "",
  },
  {
    id: 8,
    src: workshopImages.paintTable,
    alt: "Creative process",
    category: "Behind The Scenes",
    span: "",
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
