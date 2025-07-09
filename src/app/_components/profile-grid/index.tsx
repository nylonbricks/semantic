import Image from 'next/image';

import { createBlur } from '@libs/image';
import { METADATA, PLAYLIST, PROFILE } from '@semantic/constants';

import Card from './card';

export const ProfileGrid = async () => {
  const blurDataURL = await createBlur(PROFILE.profileImage);

  return (
    <section
      className="grid grid-cols-1 w-full gap-[4.0625rem] tablet:grid-cols-2"
      aria-label={`${METADATA.AUTHOR.NAME}'s profile and playlist`}
    >
      <div className="column w-full">
        <h3 id="profile-heading" className="h3 text-[var(--color-gray-light)]">
          Profile
        </h3>
        <Card.Root style={{ backgroundColor: PROFILE.cardBackgroundColor }}>
          <Card.Content>
            <div
              className="row-between flex-col h-full items-start"
              role="group"
              aria-labelledby="profile-heading"
            >
              <div
                className="relative w-[6.0625rem] h-[6.0625rem] select-none rounded overflow-hidden"
                style={{
                  boxShadow: `0px 10px 39px ${PROFILE.profileImageShadowColor}`,
                  filter: PROFILE.profileImageFilter,
                }}
              >
                <Image
                  className="w-full h-full object-cover"
                  src={PROFILE.profileImage}
                  alt={`${METADATA.AUTHOR.NAME} profile image`}
                  role="img"
                  placeholder="blur"
                  blurDataURL={blurDataURL}
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  draggable={false}
                  priority
                  fill
                />
              </div>

              <p
                className="profile-name w-full text-center"
                style={{ color: PROFILE.authorTextColor }}
              >
                {METADATA.AUTHOR.NAME}
              </p>
            </div>

            <dl className="row-between flex-col h-full items-start">
              {PROFILE.userDetails.map((item) => (
                <div key={item.title} className="w-full">
                  <dt className="profile-sub w-full" style={{ color: PROFILE.titleTextColor }}>
                    {item.title}
                  </dt>
                  <dd
                    className="profile-title text-[#302C1D] whitespace-pre-wrap"
                    style={{ color: PROFILE.contentTextColor }}
                  >
                    {item.content}
                  </dd>
                </div>
              ))}
            </dl>
          </Card.Content>
        </Card.Root>
      </div>

      <div className="column w-full">
        <h3 id="playlist-heading" className="h3 text-[var(--color-gray-light)]">
          Playlist
        </h3>
        <Card.Root style={{ backgroundColor: '#F8F8FA' }}>
          <iframe
            title={`${METADATA.AUTHOR.NAME}'s embedded music playlist`}
            aria-label={`${METADATA.AUTHOR.NAME}'s embedded music playlist`}
            className="w-full h-full rounded-[0.875rem] overflow-hidden"
            allow="autoplay *; encrypted-media *; fullscreen *; clipboard-write"
            frameBorder="0"
            height="11.375rem"
            sandbox="allow-forms allow-popups allow-same-origin allow-scripts allow-storage-access-by-user-activation allow-top-navigation-by-user-activation"
            src={PLAYLIST}
          />
        </Card.Root>
      </div>
    </section>
  );
};
