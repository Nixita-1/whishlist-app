export const getProxiedImageUrl = (originalUrl: string): string => {
  if (!originalUrl) return '';
  if (originalUrl.startsWith('data:') || originalUrl.startsWith('blob:')) return originalUrl;
  if (originalUrl.startsWith('/') || !originalUrl.includes('://')) return originalUrl;

  try {
    const url = new URL(originalUrl);
    const trustedDomains = ['unsplash.com', 'images.unsplash.com', 'pixabay.com', 'pexels.com', 'images.pexels.com', 'cdn.pixabay.com', 'picsum.photos', 'via.placeholder.com', 'placehold.co', 'dummyimage.com', 'imgur.com', 'i.imgur.com'];
    const isTrusted = trustedDomains.some(domain => url.hostname.includes(domain));
    if (isTrusted) return originalUrl;
    return `https://images.weserv.nl/?url=${encodeURIComponent(originalUrl)}`;
  } catch (error) {
    return originalUrl;
  }
};

export const getSuggestedImageUrls = (): string[] => {
  return [
    'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=800',
    'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800',
    'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800',
    'https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=800',
    'https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=800',
  ];
};

export const isValidImageUrl = (url: string): boolean => {
  if (!url) return false;
  try {
    const urlObj = new URL(url);
    const pathname = urlObj.pathname.toLowerCase();
    const imageExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.webp', '.svg', '.bmp'];
    return imageExtensions.some(ext => pathname.endsWith(ext)) || 
           urlObj.hostname.includes('unsplash') ||
           urlObj.hostname.includes('pexels') ||
           urlObj.hostname.includes('pixabay') ||
           urlObj.hostname.includes('imgur');
  } catch {
    return false;
  }
};
