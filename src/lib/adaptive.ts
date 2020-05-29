enum SIZE {
  MOBILE = 'mobile',
  TABLET = 'tablet',
  DESKTOP = 'desktop',
}

const SIZES = {
  [SIZE.MOBILE]: 768,
  [SIZE.TABLET]: 1068,
  [SIZE.DESKTOP]: 1280,
};

const getSize = (size: SIZE): number => SIZES[size];

export const isMobile = () => {
  return document.documentElement.clientWidth <= getSize(SIZE.MOBILE);
};
