import { PrismaClient } from "@prisma/client";
import { hash } from "bcrypt-ts";

const prisma = new PrismaClient();

async function seedBlogs() {
  // Check if blogs already exist
  const existingBlogs = await prisma.blog.findMany();
  const existingTopics = await prisma.topic.findMany();
  const existingComments = await prisma.comment.findMany();
  const existingUsers = await prisma.user.findMany();

  // if (existingBlogs.length === 0) {
  // Seed topics if they don't already exist
  if (existingTopics.length === 0) {
    await prisma.topic.createManyAndReturn({
      data: [
        { name: "General Tech" },
        { name: "Developer Tales" },
        { name: "Personal Experiences" },
      ],
      skipDuplicates: true,
    });
  }

  if (existingUsers.length === 0) {
    const users = [
      { name: "Mary Jane", email: "maryjane@email.com", role: "USER" },
      {
        name: "Kisiagani Njuguna",
        email: "kisiagani_nju@email.com",
        role: "USER",
      },
      { name: "Njeri Atieno", email: "njeriatieno@email.com", role: "USER" },
      { name: "John Wamalwa", email: "wamalwajohn@email.com", role: "USER" },
    ];

    // Hash passwords before inserting
    const hashedUsers = await Promise.all(
      users.map(async (user) => ({
        ...user,
        password: await hash("defaultPassword123", 10),
      }))
    );

    // Insert into database
    await prisma.user.createManyAndReturn({
      data: hashedUsers,
      skipDuplicates: true,
    });
  }

  // Seed blogs
  await prisma.blog.createManyAndReturn({
    data: [
      {
        title: "The Future of Artificial Intelligence",
        excerpt:
          "Artificial Intelligence is no longer a futuristic concept. It is embedded in our everyday lives, from autonomous vehicles to personal assistants like Siri and Alexa. As AI continues to evolve, industries...",
        content:
          "Artificial Intelligence (AI) has evolved at an astounding pace, infiltrating nearly every sector imaginable. From chatbots providing customer service to the use of AI in medical diagnosis, it is reshaping industries across the globe. The rise of machine learning and deep learning algorithms has unlocked new possibilities, making AI not just a tool but a partner in solving complex problems. In healthcare, AI helps doctors diagnose diseases with greater accuracy and speed, while in finance, it analyzes massive datasets to predict market trends and optimize investments. In transportation, self-driving cars are becoming a reality, challenging our traditional notions of mobility. As AI continues to improve, it will likely redefine entire industries, with applications in everything from automation to personal assistants, making it an essential part of our daily lives.",
        thumbnail: "https://example.com/ai-thumbnail.jpg",
        topicId: 1,
        likes: 25,
      },
      {
        title: "A Day in the Life of a Developer",
        excerpt:
          "Being a developer is much more than just writing code. It's about solving problems, creating solutions, and constantly learning. A day in the life of a developer can involve writing new features...",
        content:
          "A day in the life of a software developer can be as dynamic as the projects they work on. The morning might begin with a team meeting where developers discuss their progress and blockers. Afterward, it's time to dive into code – whether that means building new features, fixing bugs, or reviewing pull requests from colleagues. The challenge lies in not just writing code that works, but writing code that is maintainable, efficient, and scalable. Developers often juggle multiple tasks at once, from building new features to ensuring the existing code base is bug-free. Collaboration with other developers, designers, and project managers is key to making sure the product moves forward. Whether working in a fast-paced startup or a large enterprise, developers are always learning, staying updated with new technologies, and refining their skills. The day typically ends with a sense of accomplishment but also with a realization that the next day will bring new challenges to overcome.",
        thumbnail: "https://example.com/dev-life.jpg",
        topicId: 2,
        likes: 15,
      },
      {
        title: "Lessons Learned from Failure",
        excerpt:
          "Failure is often viewed negatively, but in reality, it is one of the most valuable teachers in life. In this post, we’ll explore how failure can teach us lessons that help us grow...",
        content:
          "Failure is something that everyone experiences at some point, but it is often misunderstood. Instead of seeing failure as a setback, it should be seen as an opportunity to learn and grow. The best lessons often come from the mistakes we make along the way. Whether it's in our personal lives or professional careers, failure teaches us to persevere, adapt, and refine our approach. In business, failed ventures often provide valuable insights into what doesn’t work, allowing entrepreneurs to pivot and improve their future strategies. In life, personal failures help us develop emotional resilience, teaching us how to cope with adversity and bounce back stronger. Embracing failure as part of the journey is key to success. Each failure brings with it the potential for growth, learning, and ultimately achieving greater things than we could have imagined before.",
        thumbnail: null,
        topicId: 3,
        likes: 30,
      },
      {
        title: "Breaking into Tech as a Beginner",
        excerpt:
          "Starting a career in tech can be intimidating. With so many paths to choose from, it’s hard to know where to begin. But with the right mindset and tools, anyone can break into the tech...",
        content:
          "Breaking into tech can feel overwhelming, especially when you're new to the field. The industry is vast, and there are countless roles to choose from – whether you're interested in development, data analysis, or even IT support. The key to success lies in starting with the basics: learning a programming language, building a strong portfolio, and networking with others in the industry. It’s also important to stay curious and be willing to learn continuously. As the tech industry evolves, new tools, languages, and frameworks emerge, making it essential for beginners to remain adaptable. Bootcamps, online courses, and community events are great ways to fast-track your learning. More importantly, don’t let imposter syndrome hold you back – everyone starts somewhere. The tech world is full of opportunities, and with determination, you can find your place in this ever-growing industry.",
        thumbnail: "https://example.com/beginner-tech.jpg",
        topicId: 1,
        likes: 20,
      },
      {
        title: "Debugging Nightmares",
        excerpt:
          "Debugging can be one of the most frustrating tasks for a developer. You spend hours tracking down the source of a problem, only to find that the solution was hiding in plain sight. In this post, we ...",
        content:
          "Debugging is an essential part of every developer's journey, but it can often feel like a nightmare. Sometimes the most elusive bugs are the ones that seem to appear out of nowhere. In one memorable experience, a developer spent an entire day trying to resolve a problem with an app's authentication system, only to discover that a misplaced semicolon was the root cause. In another case, an issue with the app’s responsiveness took weeks to pinpoint, only to reveal that a single line of CSS was conflicting with a third-party library. Debugging requires patience, attention to detail, and a methodical approach. It can be incredibly frustrating, but when the bug is finally found and fixed, it provides an immense sense of accomplishment. Debugging nightmares teach us to be diligent, thorough, and never give up when faced with challenges.",
        thumbnail: null,
        topicId: 2,
        likes: 12,
      },
      {
        title: "The Art of Storytelling in Tech",
        excerpt:
          "Storytelling is a powerful tool in tech. Whether you’re presenting an idea to stakeholders or explaining complex concepts to non-technical audiences, mastering...",
        content:
          "In the world of technology, storytelling is often overlooked, but it’s an incredibly effective way to communicate ideas and inspire action. Developers often work with technical data and complex concepts, but being able to present these in a simple, engaging way can make all the difference. Storytelling helps break down complex topics into digestible narratives that people can relate to. For example, explaining a technical project through the lens of a user’s experience can help stakeholders understand its value, making it easier to secure buy-in. Whether you’re writing documentation, pitching a new project, or simply explaining a technical concept to a colleague, storytelling can turn an ordinary explanation into something captivating. By incorporating narrative elements such as characters, conflict, and resolution, you can make even the most technical subject matter more accessible and compelling.",
        thumbnail: "https://example.com/storytelling.jpg",
        topicId: 2,
        likes: 18,
      },
      {
        title: "Overcoming Impostor Syndrome",
        excerpt:
          "Impostor syndrome is something that many people, especially in the tech industry, experience. In this post, we discuss what impostor syndrome is, how to recognize it, and most importantly, how to overcome it...",
        content:
          "Impostor syndrome is a feeling that many professionals, especially in tech, struggle with. It’s the belief that you’re not as capable as others perceive you to be, and that you’re bound to be exposed as a fraud. This can be particularly common in an industry that thrives on innovation and expertise. However, it’s important to recognize that impostor syndrome is just a mental barrier, not an accurate reflection of your abilities. Overcoming it begins with acknowledging it and reframing the narrative in your mind. Remind yourself that everyone starts somewhere and that you are growing with each experience. Surround yourself with supportive colleagues who can offer constructive feedback and affirm your value. Most importantly, embrace the idea that learning is a continuous journey, and there’s no shame in not knowing everything. Over time, impostor syndrome loses its grip as you build confidence in your skills and abilities.",
        thumbnail: "https://example.com/impostor.jpg",
        topicId: 3,
        likes: 22,
      },
      {
        title: "The Importance of Code Reviews",
        excerpt:
          "Code reviews are an essential part of software development. They help ensure code quality, foster collaboration, and provide an opportunity to learn from others. In this post, we ...",
        content:
          "Code reviews are often seen as a necessary evil, but they play a crucial role in ensuring high-quality software. A code review is not just about finding bugs or improving syntax – it’s about fostering collaboration, learning, and improving the codebase as a whole. During a code review, developers get the chance to discuss their work, share best practices, and get feedback from their peers. This process helps to ensure that the code is maintainable, efficient, and aligned with the team’s coding standards. Code reviews also provide an opportunity for less experienced developers to learn from more senior team members. Furthermore, code reviews often catch issues that might otherwise go unnoticed, reducing the number of bugs that make it into production. Embracing the code review process can lead to better software, stronger teams, and continuous improvement.",
        thumbnail: "https://example.com/code-reviews.jpg",
        topicId: 2,
        likes: 17,
      },
    ],
    skipDuplicates: true,
  });

  // if (existingComments.length === 0) {
  // Create top-level comments
  await prisma.comment.createManyAndReturn({
    data: [
      {
        blogId: 1,
        comment: "This is a fascinating article about AI!",
        likes: 10,
        userId: 1,
      },
      {
        blogId: 3,
        comment: "Thanks for sharing this advice for beginners.",
        likes: 5,
        userId: 2,
      },
      {
        blogId: 6,
        comment: "This is my very insightful comment",
        likes: 17,
        userId: 3,
      },
    ],
    skipDuplicates: true,
  });

  // Create replies using `parentId`
  await prisma.comment.createManyAndReturn({
    data: [
      {
        blogId: 1,
        comment: "I agree, AI is truly fascinating!",
        likes: 3,
        userId: 3,
        parentId: 1,
      },
      {
        blogId: 3,
        comment: "Glad you found it helpful!",
        likes: 2,
        userId: 1,
        parentId: 2,
      },
      {
        blogId: 6,
        comment: "A very insightful comment indeed",
        likes: 9,
        userId: 1,
        parentId: 3,
      },
      {
        blogId: 6,
        comment: "Not so insightful imo",
        likes: 12,
        userId: 2,
        parentId: 6,
      },
      {
        blogId: 6,
        comment: "What do you mean not insightful. Bffr!!!",
        likes: 2,
        userId: 1,
        parentId: 7,
      },
      {
        blogId: 6,
        comment: "Moot!! Agree to disagree",
        likes: 6,
        userId: 2,
        parentId: 8,
      },
      {
        blogId: 6,
        comment: "Beautiful piece Njeri",
        likes: 3,
        userId: 4,
        parentId: 3,
      },
    ],
    skipDuplicates: true,
  });
}

// Run the seed function
seedBlogs()
  .catch((e) => console.error(e))
  .finally(async () => {
    await prisma.$disconnect();
  });
