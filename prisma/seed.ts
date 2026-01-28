// e:\MyPortfolio\my-portoflio\prisma\seed.ts
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const projects = [
    {
        title: "Face Recognition System",
        desc: "Real-time face detection and recognition system capable of identifying registered users in video streams with high accuracy.",
        tags: JSON.stringify(["Python", "OpenCV", "CNN", "FaceNet"]),
        link: "#",
        color: "from-blue-500 to-cyan-500"
    },
    {
        title: "Context-Aware NLP Chatbot",
        desc: "Intelligent chatbot built with Transformer architecture, fine-tuned on customer support datasets to provide context-aware responses.",
        tags: JSON.stringify(["PyTorch", "HuggingFace", "BERT", "FastAPI"]),
        link: "#",
        color: "from-purple-500 to-pink-500"
    },
    {
        title: "Autonomous Drone Navigation",
        desc: "Simulation of autonomous drone pathfinding using Reinforcement Learning in complex 3D environments.",
        tags: JSON.stringify(["Reinforcement Learning", "Unity", "Python", "PPO"]),
        link: "#",
        color: "from-emerald-500 to-teal-500"
    },
    {
        title: "AI Recommendation Engine",
        desc: "Collaborative filtering system suggesting products based on user history and similarity metrics, scaled for 1M+ users.",
        tags: JSON.stringify(["Scikit-learn", "Redis", "System Design"]),
        link: "#",
        color: "from-orange-500 to-red-500"
    }
];

const certificates = [
    {
        title: "Professional AI Certification",
        issuer: "Tech Institute",
        date: "2023",
        desc: "Advanced certification in deep learning architectures and computer vision systems.",
        link: "#"
    },
    {
        title: "Data Science Specialization",
        issuer: "Data Academy",
        date: "2022",
        desc: "Comprehensive curriculum covering statistical analysis, machine learning, and data visualization.",
        link: "#"
    }
];

const experience = [
    {
        year: "2023 - Present",
        role: "BSc Computer Science (AI)",
        org: "Ton Duc Thang University",
        desc: "Specializing in Artificial Intelligence. Focusing on core algorithms, data structures, and advanced machine learning techniques. GPA: 3.8/4.0."
    },
    {
        year: "2022",
        role: "AI Research Intern",
        org: "TechStart Lab",
        desc: "Assisted in data preprocessing and model training for computer vision tasks. Implemented data augmentation pipelines."
    }
];

async function main() {
    // 1. Seed User
    const user = await prisma.user.upsert({
        where: { username: 'dx_anpnymous9029' },
        update: {},
        create: {
            username: 'dx_anpnymous9029',
            password: 'keepgoing', // In a real app, hash this password!
            role: 'editor',
        },
    });
    console.log({ user });

    // 2. Seed Projects
    for (const p of projects) {
        await prisma.project.create({ data: p });
    }

    // 3. Seed Certificates
    for (const c of certificates) {
        await prisma.certificate.create({
            data: {
                title: c.title,
                issuer: c.issuer,
                date: c.date,
                desc: c.desc,
                verifyUrl: c.link,
                imageUrl: "/cert-placeholder.png" // Default placeholder
            }
        });
    }

    // 4. Seed Experience
    for (const e of experience) {
        await prisma.experience.create({ data: e });
    }

    console.log('Seeding finished.');
}

main()
    .then(async () => {
        await prisma.$disconnect();
    })
    .catch(async (e) => {
        console.error(e);
        await prisma.$disconnect();
        process.exit(1);
    });
