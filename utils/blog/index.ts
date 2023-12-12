export const tiltEffectSettings = {
  max: 3, // max tilt rotation (degrees (deg))
  perspective: 1000, // transform perspective, the lower the more extreme the tilt gets (pixels (px))
  scale: 1,
  speed: 500, // speed (transition-duration) of the enter/exit transition (milliseconds (ms))
  easing: 'cubic-bezier(.03,.98,.52,.99)', // easing (transition-timing-function) of the enter/exit transition
};

export const getTiltEffectValues = (
  ref: React.RefObject<HTMLDivElement>,
  event: React.MouseEvent
) => {
  const card = ref?.current?.getBoundingClientRect();
  const cardWidth = card.width;
  const cardHeight = card.height;
  const centerX = card.left + cardWidth / 2;
  const centerY = card.top + cardHeight / 2;
  const mouseX = event.clientX - centerX;
  const mouseY = event.clientY - centerY;
  const rotateXUncapped =
    (-1 * tiltEffectSettings.max * mouseY) / (cardHeight / 2);
  const rotateYUncapped =
    (+1 * tiltEffectSettings.max * mouseX) / (cardWidth / 2);
  const valueX =
    rotateXUncapped < -tiltEffectSettings.max
      ? -tiltEffectSettings.max
      : rotateXUncapped > tiltEffectSettings.max
      ? tiltEffectSettings.max
      : rotateXUncapped;
  const valueY =
    rotateYUncapped < -tiltEffectSettings.max
      ? -tiltEffectSettings.max
      : rotateYUncapped > tiltEffectSettings.max
      ? tiltEffectSettings.max
      : rotateYUncapped;

  return { valueX, valueY };
};

export const dateFormatting = (date: string | Date) => {
  return new Date(date).toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });
};

export const scrollToTargetAdjusted = (id: string) => {
  const element = document.getElementById(id);
  const headerOffset = 85;
  const elementPosition = element.getBoundingClientRect().top;
  const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

  window.scrollTo({
    behavior: 'smooth',
    top: offsetPosition,
  });
};

export const generateMastodonShareContent = (
  postTitle: string,
  postCategory: string,
  postUrl: string
) => {
  let sharingText = `I read this article on the Kedro blog: ${postTitle} ${postUrl} by @kedro@social.lfx.dev%0A%0A`;

  let hashtags = '%23kedro %23kedroviz %23python %23pydata %23datascience ';

  const additionalHashtags = postCategory.split(',');
  for (let category of additionalHashtags) {
    hashtags = hashtags.concat(`%23${category.toLowerCase().trimStart()} `);
  }

  sharingText = sharingText.concat(hashtags).trim();

  return sharingText;
};

export const defaultImageStyle = {
  height: 'auto',
  maxWidth: '100%',
};

export const imageSpacing = {
  marginRight: '6px',
};
