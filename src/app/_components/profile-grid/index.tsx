import { METADATA } from "@semantic/constants/metadata";
import { PLAYLIST, PROFILE } from "@semantic/constants/profile";
import Image from "next/image";

import Card from "./card";

export const ProfileGrid = () => {
  return (
    <section
      aria-label={`${METADATA.AUTHOR.NAME}'s profile and playlist`}
      className="grid w-full grid-cols-1 tablet:grid-cols-2 gap-[4.0625rem]"
    >
      <div className="column w-full">
        <h3 className="h3 text-[var(--color-gray-light)]" id="profile-heading">
          Profile
        </h3>
        <Card.Root style={{ backgroundColor: PROFILE.cardBackgroundColor }}>
          <Card.Content>
            <fieldset
              aria-labelledby="profile-heading"
              className="row-between m-0 h-full flex-col items-start border-0 p-0"
            >
              <div
                className="relative h-[6.0625rem] w-[6.0625rem] select-none overflow-hidden rounded-[var(--radius-md)] border bg-[var(--color-toggle)]"
                style={{
                  borderColor: PROFILE.profileImageBorderColor,
                  boxShadow: `0px 10px 39px ${PROFILE.profileImageShadowColor}`,
                  filter: PROFILE.profileImageFilter,
                }}
              >
                <Image
                  alt={`${METADATA.AUTHOR.NAME} profile image`}
                  className="h-full w-full rounded-none border-0 object-cover"
                  draggable={false}
                  fill
                  priority
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  src={PROFILE.profileImage}
                />
              </div>

              <p
                className="profile-name w-full text-center"
                style={{ color: PROFILE.authorTextColor }}
              >
                {METADATA.AUTHOR.NAME}
              </p>
            </fieldset>

            <dl className="row-between h-full flex-col items-start">
              {PROFILE.userDetails.map((item) => (
                <div className="w-full" key={item.title}>
                  <dt
                    className="profile-sub w-full"
                    style={{ color: PROFILE.titleTextColor }}
                  >
                    {item.title}
                  </dt>
                  <dd
                    className="profile-title whitespace-pre-wrap text-[#302C1D]"
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
        <h3 className="h3 text-[var(--color-gray-light)]" id="playlist-heading">
          Playlist
        </h3>
        <Card.Root style={{ backgroundColor: "#F8F8FA" }}>
          <iframe
            allow="autoplay *; encrypted-media *; fullscreen *; clipboard-write"
            aria-label={`${METADATA.AUTHOR.NAME}'s embedded music playlist`}
            className="h-full w-full overflow-hidden rounded-[0.875rem]"
            frameBorder="0"
            height="11.375rem"
            sandbox="allow-forms allow-popups allow-same-origin allow-scripts allow-storage-access-by-user-activation allow-top-navigation-by-user-activation"
            src={PLAYLIST}
            title={`${METADATA.AUTHOR.NAME}'s embedded music playlist`}
          />
        </Card.Root>
      </div>
    </section>
  );
};
