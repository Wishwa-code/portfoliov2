import { getPosts } from '@/app/utils';
import { Flex ,Button} from '@/once-ui/components';

import { CertificateCard } from '@/components';

interface CertificatesProps {
    range?: [number, number?];
    locale: string;
}

export function Certificates2({ range, locale }: CertificatesProps) {
    let allCertificates = getPosts(['src', 'app', '[locale]', 'about', 'certificates2', locale]);

    const sortedCertificates = allCertificates.sort((a, b) => {
        return new Date(b.metadata.publishedAt).getTime() - new Date(a.metadata.publishedAt).getTime();
    });

    const displayedCertificates = range
        ? sortedCertificates.slice(range[0] - 1, range[1] ?? sortedCertificates.length)
        : sortedCertificates;

    return (
        <Flex
            fillWidth gap="l" marginBottom="40" paddingX="l"
            direction="column">
            {displayedCertificates.map((certificate) => (
                <CertificateCard
                    key={certificate.slug}
                    href={`work/${certificate.slug}`}
                    images={certificate.metadata.images}
                    title={certificate.metadata.title}
                    description={certificate.metadata.summary}
                    content={certificate.content}
                    avatars={certificate.metadata.team?.map((member) => ({ src: member.avatar })) || []}/>
            ))}
        </Flex>
    );
}