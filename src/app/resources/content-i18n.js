import { InlineCode } from "@/once-ui/components";


const createI18nContent = (t) => {
    const person = {
        firstName: t("person.firstName"),
        lastName:  t("person.lastName"),
        get name() {
            return `${this.firstName} ${this.lastName}`;
            // return 'Wishwa';
        },
        role:      t("person.role"),
        avatar:    '/images/avatar.jpg',
        location:  'Asia/Colombo',        // Expecting the IANA time zone identifier, e.g., 'Europe/Vienna'
        languages: ['English', 'Sinhala']  // optional: Leave the array empty if you don't want to display languages
    }

    const certificate = {
        display: true,
        title: <>{t("certificate.title")}</>,
        description: <>{t("certificate.description")}</>,
        program: <>{t("certificate.program")}</>,
        link: 'https://www.westminster.ac.uk/',
        buttonname: 'UOW'

    }

    const certificate2 = {
        display: true,
        title: <>{t("certificate2.title")}</>,
        description: <>{t("certificate2.description")}</>,
        program: <>{t("certificate2.program")}</>,
        link: 'https://evotecheducation.com/',
        buttonname: 'Evotech'

    }

    const newsletter = {
        display: false,
        title: <>{t("newsletter.title", {firstName: person.firstName})}</>,
        description: <>{t("newsletter.description")}</>
    }

    const social = [
        // Links are automatically displayed.
        // Import new icons in /once-ui/icons.ts
        {
            name: 'GitHub',
            icon: 'github',
            link: 'https://github.com/Wishwa-code',
        },
        
        {
            name: 'Youtube',
            icon: 'youtube',
            link: 'https://www.youtube.com/@wishwakankanamge129',
        },
        {
            name: 'LinkedIn',
            icon: 'linkedin',
            link: 'https://www.linkedin.com/in/wishwa-kankanamge-2404051b5/',
        },
        {
            name: 'Resume',
            icon: 'cv',
            link: 'https://drive.google.com/file/d/1ANRy4L4HowVBvFgukHL0Np_gAxisxY-C/view?usp=sharing',
        },
        
        {
            name: 'Email',
            icon: 'email',
            link: '',
        },
    ]

    const home = {
        label: t("home.label"),
        title: t("home.title", {name: person.name}),
        description: t("home.description", {role: person.role}),
        headline: <>{t("home.headline")}</>,
        subline: <>{t("home.subline")}</>
    }

    const about = {
        label: t("about.label"),
        title: t("about.label"),
        description: t("about.description", {name: person.name, role: person.role, location: person.location}),
        tableOfContent: {
            display: true,
            subItems: true
        },
        avatar: {
            display: true
        },
        calendar: {
            display: true,
            link: 'https://cal.com/wishwa-kankanamge/meeting'
        },
        intro: {
            display: true,
            title: t("about.intro.title"),
            description: <>{t("about.intro.description")}</>
        },
        work: {
            display: true, // set to false to hide this section
            title: t("about.work.title"),
            experiences: [
                {
                    company: t("about.work.experiences.FLY.name"),
                    timeframe: t("about.work.experiences.FLY.timeframe"),
                    role: t("about.work.experiences.FLY.role"),
                    achievements: t("about.work.experiences.FLY.achievements").split(";"),
                    images: [ // optional: leave the array empty if you don't want to display images
                        // {
                        //     src: '/images/projects/project-01/cover-01.jpg',
                        //     alt: 'Once UI Project',
                        //     width: 16,
                        //     height: 9
                        // }
                    ]
                },
                {
                    company: t("about.work.experiences.WAD.name"),
                    timeframe: t("about.work.experiences.WAD.timeframe"),
                    role: t("about.work.experiences.WAD.role"),
                    achievements: t("about.work.experiences.WAD.achievements").split(";"),
                    images: [ ]
                }
            ]
        },
        studies: {
            display: true, // set to false to hide this section
            title: t("about.studies.title"),
            institutions: [
                {
                    name: <>{t(`about.studies.institutions.University of Westminster.name`)}</>,
                    faculty: <>{t(`about.studies.institutions.University of Westminster.faculty`)}</>,
                    description: <>{t(`about.studies.institutions.University of Westminster.description`)}</>,
                    label: <>{t(`about.studies.institutions.University of Westminster.label`)}</>,
                    link: <>{t(`about.studies.institutions.University of Westminster.link`)}</>,
                },
                {
                    name: <>{t(`about.studies.institutions.Java Programming Master.name`)}</>,
                    faculty: <>{t(`about.studies.institutions.Java Programming Master.faculty`)}</>,
                    description: <>{t(`about.studies.institutions.Java Programming Master.description`)}</>,
                    label: <>{t(`about.studies.institutions.Java Programming Master.label`)}</>,
                    link: <>{t(`about.studies.institutions.Java Programming Master.link`)}</>,

                },
            ]
        },
        certificates: {
            display: true, // set to false to hide this section
            title: t("about.certificates.title"),
            institutions: [
                {
                    name: <>{t(`about.certificates.institutions.Web Programming with Python and Javascript.name`)}</>,
                    credentialID: <>{t(`about.certificates.institutions.Web Programming with Python and Javascript.credentialID`)}</>,
                    link: <>{t(`about.certificates.institutions.Web Programming with Python and Javascript.link`)}</>,
                    label: <>{t(`about.certificates.institutions.Web Programming with Python and Javascript.label`)}</>,
                },
                {
                    name: <>{t(`about.certificates.institutions.Agents Course.name`)}</>,
                    credentialID: <>{t(`about.certificates.institutions.Agents Course.credentialID`)}</>,
                    link: <>{t(`about.certificates.institutions.Agents Course.link`)}</>,
                    label: <>{t(`about.certificates.institutions.Agents Course.label`)}</>,
                },
                {
                    name: <>{t(`about.certificates.institutions.Business Intelligence.name`)}</>,
                    credentialID: <>{t(`about.certificates.institutions.Business Intelligence.credentialID`)}</>,
                    link: <>{t(`about.certificates.institutions.Business Intelligence.link`)}</>,
                    label: <>{t(`about.certificates.institutions.Business Intelligence.label`)}</>,
                },
                {
                    name: <>{t(`about.certificates.institutions.Business Analytics.name`)}</>,
                    credentialID: <>{t(`about.certificates.institutions.Business Analytics.credentialID`)}</>,
                    link: <>{t(`about.certificates.institutions.Business Analytics.link`)}</>,
                    label: <>{t(`about.certificates.institutions.Business Analytics.label`)}</>,
                }
            ]
        },
        technical: {
            display: true, // set to false to hide this section
            title: t("about.technical.title"),
            skills: [
                // {
                //     title: 'Particularly interested in',
                //     description: <>{t("about.technical.skills.Particularly interested in.description")}</>,
                //     images: []
                // },
                {
                    title: 'Libraries',
                    description: <>{t("about.technical.skills.Libraries.description")}</>,
                    images: [
                    ]
                },
                {
                    title: 'Computer Languages',
                    description: <>{t("about.technical.skills.Computer Languages.description")}</>, // "." not accepted in next-intl namespace
                    images: [
                        // {
                        //     src: '/images/projects/project-01/cover-04.png',
                        //     alt: 'Project image',
                        //     width: 16,
                        //     height: 9
                        // },
                    ]
                },
                {
                    title: 'Specialities',
                    description: <>{t("about.technical.skills.Specialities.description")}</>, // "." not accepted in next-intl namespace
                    images: [
                        // {
                        //     src: '/images/projects/project-01/cover-04.png',
                        //     alt: 'Project image',
                        //     width: 16,
                        //     height: 9
                        // },
                    ]
                },
                {
                    title: 'Certifications',
                    description: <>{t("about.technical.skills.Certifications.description")}</>, // "." not accepted in next-intl namespace
                    images: [
                        // {
                        //     src: '/images/projects/project-01/cover-04.png',
                        //     alt: 'Project image',
                        //     width: 16,
                        //     height: 9
                        // },
                    ]
                }
            ]
        }
    }

    const blog = {
        label: t("blog.label"),
        title: t("blog.title"),
        description: t("blog.description", {name: person.name})
        // Create new blog posts by adding a new .mdx file to app/blog/posts
        // All posts will be listed on the /blog route
    }

    const work = {
        label: t("work.label"),
        title: t("work.title"),
        description: t("work.description", {name: person.name})
        // Create new project pages by adding a new .mdx file to app/blog/posts
        // All projects will be listed on the /home and /work routes
    }

    const gallery = {
        label: t("gallery.label"),
        title: t("gallery.title"),
        description: t("gallery.description", {name: person.name}),
        // Images from https://pexels.com
        images: [
            {
                src: '/images/gallery/img-01.jpg',
                alt: 'image',
                orientation: 'vertical'
            },
            {
                src: '/images/gallery/img-02.jpg',
                alt: 'image',
                orientation: 'horizontal'
            },
            { 
                src: '/images/gallery/img-03.jpg',
                alt: 'image',
                orientation: 'vertical'
            },
            { 
                src: '/images/gallery/img-04.jpg',
                alt: 'image',
                orientation: 'horizontal'
            },
            {
                src: '/images/gallery/img-05.jpg',
                alt: 'image',
                orientation: 'horizontal'
            },
            {
                src: '/images/gallery/img-06.jpg',
                alt: 'image',
                orientation: 'vertical'
            },
            {
                src: '/images/gallery/img-07.jpg',
                alt: 'image',
                orientation: 'horizontal'
            },
            {
                src: '/images/gallery/img-08.jpg',
                alt: 'image',
                orientation: 'vertical'
            },
            {
                src: '/images/gallery/img-09.jpg',
                alt: 'image',
                orientation: 'horizontal'
            },
            {
                src: '/images/gallery/img-10.jpg',
                alt: 'image',
                orientation: 'horizontal'
            },
            { 
                src: '/images/gallery/img-11.jpg',
                alt: 'image',
                orientation: 'vertical'
            },
            {
                src: '/images/gallery/img-12.jpg',
                alt: 'image',
                orientation: 'horizontal'
            },
            {
                src: '/images/gallery/img-13.jpg',
                alt: 'image',
                orientation: 'horizontal'
            },
            { 
                src: '/images/gallery/img-14.jpg',
                alt: 'image',
                orientation: 'horizontal'
            },
        ]
    }
    return {
        person,
        social,
        newsletter,
        home,
        about,
        blog,
        work,
        gallery,
        certificate,
        certificate2
    }
};

export { createI18nContent };
