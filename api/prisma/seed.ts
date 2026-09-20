import { PrismaClient, Role, ApplicationStatus, EducationLevel } from '@prisma/client';
import bcrypt from 'bcrypt';
const prisma = new PrismaClient();
const jobs = [
  ['Senior Product Designer', 'Own the product experience from discovery through launch for an early-stage B2B startup.', ['Figma', 'Product strategy', 'Prototyping'], 5],
  ['Founding Full Stack Engineer', 'Build the first version of the platform and establish pragmatic engineering foundations.', ['TypeScript', 'React', 'PostgreSQL'], 4],
  ['Growth Marketing Lead', 'Create the repeatable growth engine for our first 10-20 employees.', ['Lifecycle marketing', 'Analytics', 'Content'], 6],
  ['Customer Success Manager', 'Turn early customer feedback into retention and expansion.', ['Onboarding', 'SaaS', 'Communication'], 3],
  ['Operations Associate', 'Make the operating system of an ambitious startup run smoothly.', ['Operations', 'Research', 'Project management'], 2],
] as const;
const names = ['Maya Chen', 'Jordan Bell', 'Priya Nair', 'Noah Williams', 'Elena Rossi', 'Sam Okafor', 'Ava Patel', 'Liam Carter', 'Sofia Garcia', 'Theo Martin', 'Grace Kim', 'Ethan Brooks', 'Zoe Adams', 'Omar Hassan', 'Nina Shah', 'Lucas Reed', 'Iris Wong', 'Ben Cole', 'Amara Okoye', 'Jack Stone', 'Mia Ford', 'Kai Morgan', 'Leah Scott', 'Max Young', 'Sara Diaz', 'Daniel Lee', 'Ari Cohen', 'Rhea Singh', 'Cole James', 'Tara Evans', 'Jon Bell', 'Nora Fox'];
async function main() {
  await prisma.auditLog.deleteMany(); await prisma.scorecard.deleteMany(); await prisma.videoResponse.deleteMany(); await prisma.application.deleteMany(); await prisma.screeningQuestion.deleteMany(); await prisma.job.deleteMany(); await prisma.candidate.deleteMany(); await prisma.user.deleteMany();
  const passwordHash = await bcrypt.hash('DemoPassword123!', 12);
  const recruiter = await prisma.user.create({ data: { email: 'alex@hirelens.demo', passwordHash, role: Role.ADMIN, name: 'Alex Rivera' } });
  for (const [title, description, requiredSkills, minYearsExperience] of jobs) {
    const job = await prisma.job.create({ data: { title, description, location: 'United States', remote: true, education: EducationLevel.BACHELORS, minYearsExperience, requiredSkills, scoreWeights: { skills: 70, years: 30 }, screeningQuestions: { create: ['Tell us about a difficult problem you solved.', 'How do you work with a small, cross-functional team?', 'What would you improve in your first 30 days?'].map((prompt, order) => ({ prompt, order })) } } });
    for (let i = 0; i < names.length / jobs.length; i++) {
      const name = names[(i + jobs.indexOf(jobs.find((item) => item[0] === title)!) * 6) % names.length];
      const email = `${name.toLowerCase().replace(/ /g, '.')}+${job.id.slice(-4)}@demo.hirelens.test`;
      const user = await prisma.user.create({ data: { email, passwordHash, role: Role.CANDIDATE, name } });
      const candidate = await prisma.candidate.create({ data: { userId: user.id, location: i % 3 === 0 ? 'Remote' : 'New York, NY', yearsExperience: Math.max(1, minYearsExperience - 2 + (i % 6)), skills: [...requiredSkills].slice(0, 1 + (i % requiredSkills.length)) } });
      const score = Math.min(98, 52 + (i * 7) % 47);
      await prisma.application.create({ data: { jobId: job.id, candidateId: candidate.id, score, status: [ApplicationStatus.APPLIED, ApplicationStatus.SCREENED, ApplicationStatus.INTERVIEW][i % 3], scoreBreakdown: { requiredSkills: requiredSkills.map((skill) => ({ skill, matched: candidate.skills.includes(skill) })), years: { required: minYearsExperience, actual: candidate.yearsExperience, matched: candidate.yearsExperience >= minYearsExperience } }, responses: { create: (await prisma.screeningQuestion.findMany({ where: { jobId: job.id } })).map((question) => ({ questionId: question.id, textFallback: 'Demo response for seed data.', durationSeconds: 104 })) } } });
    }
  }
  console.log(`Seeded ${jobs.length} jobs and ${names.length} candidates. Recruiter: ${recruiter.email}`);
}
main().finally(() => prisma.$disconnect());
