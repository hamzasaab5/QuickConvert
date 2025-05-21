
export const passportPhotoConfig = {
  presets: [
    { name: 'US Passport (2x2 inch)', width: 2, height: 2, unit: 'in', dpi: 300, aspect: 1 },
    { name: 'Schengen Visa (35x45 mm)', width: 35, height: 45, unit: 'mm', dpi: 300, aspect: 35 / 45 },
    { name: 'UK Passport (35x45 mm)', width: 35, height: 45, unit: 'mm', dpi: 300, aspect: 35 / 45 },
    { name: 'Canada Passport (50x70 mm)', width: 50, height: 70, unit: 'mm', dpi: 300, aspect: 50 / 70 },
    { name: 'Indian Passport (2x2 inch)', width: 2, height: 2, unit: 'in', dpi: 300, aspect: 1 },
    { name: 'Australian Passport (35x45 mm)', width: 35, height: 45, unit: 'mm', dpi: 300, aspect: 35 / 45 },
    { name: 'Custom Square (1:1)', width: 500, height: 500, unit: 'px', dpi: 72, aspect: 1, custom: true },
    { name: 'Custom Portrait (3:4)', width: 375, height: 500, unit: 'px', dpi: 72, aspect: 3 / 4, custom: true },
    { name: 'Custom Landscape (4:3)', width: 500, height: 375, unit: 'px', dpi: 72, aspect: 4 / 3, custom: true },
  ],
  defaultPresetName: 'US Passport (2x2 inch)',
};

export const getPresetByName = (name) => {
  return passportPhotoConfig.presets.find(preset => preset.name === name);
};

export const convertToPixels = (value, unit, dpi) => {
  if (unit === 'in') {
    return value * dpi;
  }
  if (unit === 'mm') {
    return (value / 25.4) * dpi; 
  }
  return value; 
};
