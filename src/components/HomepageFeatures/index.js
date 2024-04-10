import clsx from 'clsx';
import Heading from '@theme/Heading';
import styles from './styles.module.css';

const FeatureList = [
  {
    title: 'Local Voice Chatbot',
    imageUrl: '/img/cover/cover-local-voice-chatbot.gif',
    description: (
      <>
        Utilizing Nvidia Riva and Meta Llama2, I have developed a secure, private, and fast-responding voice interaction system.
      </>
    ),
    learnMoreLink: '/docs/local-voice-chatbot',
  },
  {
    title: 'Exercise Counter',
    imageUrl: '/img/cover/cover-exercise-counter.gif',
    description: (
      <>
        This is a pose estimation demo application for exercise counting with YOLOv8 using YOLOv8-Pose model. 
      </>
    ),
    learnMoreLink: '/docs/exercise-counter',
  },
  {
    title: 'Image Fusion',
    imageUrl: '/img/cover/cover-image-fusion.gif',
    description: (
      <>
        This is a interesting image fusion project to paste stickers into the image with OpenCV and YOLOv8.       
      </>
    ),
    learnMoreLink: '/docs/exercise-counter',
  },


  
];

function Feature({imageUrl, title, description, learnMoreLink }) {

  return (
    <div className={clsx('col col--4')}>
      <div className="text--center">
        <img src={imageUrl} className={styles.featureImg} alt={title} />
      </div>
      <div className="text--center padding-horiz--md">
        <Heading as="h3">{title}</Heading>
        <p>{description}</p>
        <a href={learnMoreLink} className={styles.button}>Learn More</a>
      </div>
    </div>
  );
}

export default function HomepageFeatures() {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}


