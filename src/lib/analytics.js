export const GA_TRACKING_ID_1 = 'G-3FZ2LYXSK1';
export const GA_TRACKING_ID_2 = 'G-68LFM2WD2C';

export const pageview = (url) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('config', GA_TRACKING_ID_1, {
      page_path: url,
    });
    window.gtag('config', GA_TRACKING_ID_2, {
      page_path: url,
    });
  }
};

export const event = ({ action, category, label, value }) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', action, {
      event_category: category,
      event_label: label,
      value: value,
    });
  }
};
