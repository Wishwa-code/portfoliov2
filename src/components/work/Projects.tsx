import { getPosts } from '@/app/utils';
import { Flex,  RevealFx } from '@/once-ui/components';

import { ProjectCard } from '@/components';
import Threads from '@/reactbits/thread/threads';

interface ProjectsProps {
    range?: [number, number?];
    locale: string;
}

export function Projects({ range, locale }: ProjectsProps) {
    let allProjects = getPosts(['src', 'app', '[locale]', 'work', 'projects', locale]);

    const sortedProjects = allProjects.sort((a, b) => {
        return new Date(b.metadata.publishedAt).getTime() - new Date(a.metadata.publishedAt).getTime();
    });

    const displayedProjects = range
        ? sortedProjects.slice(range[0] - 1, range[1] ?? sortedProjects.length)
        : sortedProjects;

    return (
        <Flex
            fillWidth gap="l" paddingX="l"
            direction="column">
            {displayedProjects.map((post) => (
                <RevealFx 
                    translateY="16"
                    speed = 'fast'
                     >
                
                    <ProjectCard
                        key={post.slug}
                        href={`work/${post.slug}`}
                        images={post.metadata.images}
                        title={post.metadata.title}
                        description={post.metadata.summary}
                        content={post.content}
                        sourcelabel={post.metadata.sourcelabel}
                        sourcelink ={post.metadata.sourcelink}
                        sourcelabel2={post.metadata.sourcelabel2}
                        sourcelink2 ={post.metadata.sourcelink2}
                        avatars={post.metadata.team?.map((member) => ({ src: member.avatar })) || []}/>
                    
                </RevealFx>    
                    
            ))}
        </Flex>
    );
}