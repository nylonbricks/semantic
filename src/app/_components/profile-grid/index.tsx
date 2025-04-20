import Image from 'next/image';

import { METADATA, PLAYLIST, PROFILE } from '@semantic/constants';
import { getBlurDataURL } from '@semantic/libs';

import Card from './card';
import * as styles from './styles.css';

export const ProfileGrid = async () => {
  const blurDataURL = await getBlurDataURL(PROFILE.profileImage);

  return (
    <section className={styles.root}>
      <div className={styles.container}>
        <h3 className={styles.title}>Profile</h3>
        <Card.Root style={{ backgroundColor: PROFILE.cardBackgroundColor }}>
          <Card.Content>
            <div className={styles.cardProfileContainer}>
              <div
                className={styles.cardProfileImage}
                style={{
                  boxShadow: `0px 10px 39px ${PROFILE.profileImageShadowColor}`,
                  filter: PROFILE.profileImageFilter,
                }}
              >
                <Image
                  src={PROFILE.profileImage}
                  alt="Profile Image"
                  placeholder="blur"
                  blurDataURL={blurDataURL}
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  draggable={false}
                  priority
                  fill
                />
              </div>

              <p className={styles.cardProfileAuthor} style={{ color: PROFILE.authorTextColor }}>
                {METADATA.AUTHOR.NAME}
              </p>
            </div>
            <div className={styles.cardProfileContainer}>
              {PROFILE.userDetails.map((item) => (
                <div key={item.title}>
                  <h3 className={styles.cardProfileTitle} style={{ color: PROFILE.titleTextColor }}>
                    {item.title}
                  </h3>
                  <p
                    className={styles.cardProfileContent}
                    style={{ color: PROFILE.contentTextColor }}
                  >
                    {item.content}
                  </p>
                </div>
              ))}
            </div>
          </Card.Content>
        </Card.Root>
      </div>

      <div className={styles.container}>
        <h3 className={styles.title}>Playlist</h3>
        <Card.Root style={{ backgroundColor: '#F8F8FA' }}>
          <iframe
            title="playlist"
            allow="autoplay *; encrypted-media *; fullscreen *; clipboard-write"
            frameBorder="0"
            height="182"
            style={{ width: '100%', overflow: 'hidden', borderRadius: '14px' }}
            sandbox="allow-forms allow-popups allow-same-origin allow-scripts allow-storage-access-by-user-activation allow-top-navigation-by-user-activation"
            src={PLAYLIST}
          />
        </Card.Root>
      </div>
    </section>
  );
};
