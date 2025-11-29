import { techStack, type TechCategory } from '../../data/techStack';
import SectionTitle from '../ui/SectionTitle';
import AnimatedSection from '../ui/AnimatedSection';
import Badge from '../ui/Badge';

const TechCategoryCard = ({
  category,
  index,
}: {
  category: TechCategory;
  index: number;
}) => {
  const delayClass = `animation-delay-${(index + 1) * 100}`;

  const colorMap: Record<
    string,
    'frontend' | 'mobile' | 'backend' | 'devops' | 'others'
  > = {
    'tech-frontend': 'frontend',
    'tech-mobile': 'mobile',
    'tech-backend': 'backend',
    'tech-devops': 'devops',
    'tech-others': 'others',
  };

  const badgeColor = colorMap[category.color] || 'default';

  return (
    <AnimatedSection
      animation="fade-in-up"
      className={`bg-light-bg-card dark:bg-background-card rounded-xl border border-light-border-secondary dark:border-border-secondary p-6 hover:border-accent-primary/20 transition-all duration-300 shadow-sm dark:shadow-non ${delayClass}`}
    >
      <h3 className="font-mono text-lg font-semibold text-accent-primary mb-4">
        {category.tag}
      </h3>
      <div className="flex flex-wrap gap-2">
        {category.items.map((item, itemIndex) => (
          <Badge
            key={item.name}
            color={badgeColor}
            className="opacity-0 animate-fade-in"
            style={{
              animationDelay: `${index * 100 + itemIndex * 50}ms`,
              animationFillMode: 'forwards',
            }}
          >
            {item.name}
          </Badge>
        ))}
      </div>
    </AnimatedSection>
  );
}

const TechStackSection =() => {
  return (
    <section id="tech-stack" className="py-20">
      <div className="section-container">
        <SectionTitle
          title="Tech Stack"
          subtitle="Here are the technologies I've learned and applied in my work. I continue to expand this list as I grow and gain new experience as a developer."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {techStack.map((category, index) => (
            <TechCategoryCard
              key={category.title}
              category={category}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

export default TechStackSection;
