interface AppConfig {
  api: {
    url: string;
  };
  contact: {
    phone: {
      value: string;
      text: string;
    };
  };
  whatsapp: {
    url: string;
  };
  socialMedia: Array<{
    name: string;
    href: string;
    height: number;
  }> | null;
  categories: Array<{
    name: string;
    link: string;
  }> | null;
  storage: {
    keys: {
      shoppingCart: string;
    };
  };
}

const config: AppConfig = {
  api: {
    url: process.env.REACT_APP_API_URL!,
  },
  contact: {
    phone: {
      value: process.env.REACT_APP_CONTACT_PHONE_VALUE!,
      text: process.env.REACT_APP_CONTACT_PHONE_TEXT!,
    },
  },
  whatsapp: {
    url: process.env.REACT_APP_WHATSAPP_URL!,
  },
  socialMedia: (() => {
    try {
      const envValue = process.env.REACT_APP_SOCIAL_MEDIA;
      if (envValue) {
        const parsed = JSON.parse(envValue);
        return Array.isArray(parsed) ? parsed : null;
      }
    } catch (error) {
      console.warn('Failed to parse REACT_APP_SOCIAL_MEDIA:', error);
    }
    return null;
  })(),
  categories: (() => {
    try {
      const envValue = process.env.REACT_APP_CATEGORIES;
      if (envValue) {
        const parsed = JSON.parse(envValue);
        return Array.isArray(parsed) ? parsed : null;
      }
    } catch (error) {
      console.warn('Failed to parse REACT_APP_CATEGORIES:', error);
    }
    return null;
  })(),
  storage: {
    keys: {
      shoppingCart: process.env.REACT_APP_STORAGE_CART_KEY!,
    },
  },
};

const requiredEnvVars = [
  'REACT_APP_API_URL',
  'REACT_APP_CONTACT_PHONE_VALUE',
  'REACT_APP_CONTACT_PHONE_TEXT',
  'REACT_APP_WHATSAPP_URL',
  'REACT_APP_STORAGE_CART_KEY',
];

export const validateEnv = (): void => {
  const missing: string[] = [];
  
  requiredEnvVars.forEach(varName => {
    if (!process.env[varName]) {
      missing.push(varName);
    }
  });
  
  if (missing.length > 0) {
    const errorMessage = `
❌ Missing required environment variables:
${missing.map(v => `  - ${v}`).join('\n')}

Please create a .env file in the frontend directory.
You can copy .env.example as a template:
  cp .env.example .env

Then fill in the required values.
    `;
    
    throw new Error(errorMessage);
  }
};

export default config;

