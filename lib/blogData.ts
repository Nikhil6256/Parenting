export interface BlogPostData {
  _id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  coverImage: string;
  author: string;
  tags: string[];
  readingTime: number;
  publishedAt: string;
}

export const defaultBlogPosts: BlogPostData[] = [
  {
    _id: 'default-1',
    title: "5 Ways to Stay Calm During Your Child's Meltdown",
    slug: 'calm-during-meltdown',
    excerpt: "When your toddler is in full meltdown mode, staying calm feels impossible. Here are 5 science-backed strategies that actually work.",
    content: `When a child experiences a meltdown, their brain is overwhelmed by big emotions. As parents, our natural reaction might be frustration or urgency to make it stop immediately. However, responding with calm and empathy can transform these challenging moments into bonding opportunities.

1. Pause and Take Deep Breaths
Before reacting, take three deep, slow breaths. Grounding yourself signals safety to your child's nervous system.

2. Lower Your Voice and Body Language
Speak softly and get down to eye level. Avoid towering over your child or matching their loudness.

3. Validate Their Feeling, Not the Behavior
Say things like: "I see you are upset right now, and that's okay. I am right here with you."

4. Ensure Physical Safety
Keep the environment safe and offer a comforting presence without forcing physical touch if they need space.

5. Reconnect Before Reasoning
Wait until the storm passes completely before discussing what happened or teaching a lesson. Connection always comes before correction.`,
    coverImage: 'https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=800&q=80',
    author: 'Rupali',
    tags: ['Toddlers', 'Emotions'],
    readingTime: 5,
    publishedAt: '2026-08-01T00:00:00.000Z',
  },
  {
    _id: 'default-2',
    title: 'Why Screen Time Limits Are Less Important Than You Think',
    slug: 'screen-time-rethink',
    excerpt: "The quality of what your child watches matters more than the hours spent. Here's how to make screens work FOR your family.",
    content: `Screen time is one of the most common sources of guilt for modern parents. But shifting the focus from rigid time limits to content quality and interactive engagement can create a healthier balance.

Focus on Content Quality
Educational, interactive, and slow-paced shows stimulate creativity rather than over-stimulating the brain.

Co-viewing and Conversation
Watch alongside your child when possible. Talk about what the characters are feeling, what choices they make, and what your child thinks about the story.

Create Tech-Free Zones
Establish screen-free meal times and ensure screens are put away an hour before bedtime to support restful sleep.`,
    coverImage: 'https://images.unsplash.com/photo-1516627145497-ae6968895b74?auto=format&fit=crop&w=800&q=80',
    author: 'Rupali',
    tags: ['Technology', 'Development'],
    readingTime: 7,
    publishedAt: '2026-07-28T00:00:00.000Z',
  },
  {
    _id: 'default-3',
    title: 'The One Thing Indian Parents Get Wrong About Discipline',
    slug: 'discipline-indian-parents',
    excerpt: 'Discipline is about teaching, not punishing. Discover the key shift that transforms power struggles into peaceful cooperation.',
    content: `In many traditional settings, discipline has been associated with strict obedience and fear. True discipline, however, originates from the root word for "teaching" and "learning."

1. Shift from Punishment to Guidance
Punishment creates resentment or secretiveness, whereas positive guidance teaches self-regulation and problem-solving skills.

2. Set Clear and Consistent Boundaries
Children thrive when boundaries are clear, compassionate, and consistently maintained without emotional harshness.

3. Model the Behaviors You Wish to See
Children learn far more from watching how parents handle stress, conflicts, and mistakes than from verbal instructions.`,
    coverImage: 'https://images.unsplash.com/photo-1491438590914-bc09fcaaf77a?auto=format&fit=crop&w=800&q=80',
    author: 'Rupali',
    tags: ['Discipline', 'Culture'],
    readingTime: 6,
    publishedAt: '2026-07-20T00:00:00.000Z',
  },
];
