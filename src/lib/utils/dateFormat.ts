import { format } from "date-fns";
import { es } from "date-fns/locale";

// Sitio en español: los nombres de mes y día salen en castellano
// ("jueves, sept 03, 2026" en lugar de "Thursday, Sep 03, 2026").
const dateFormat = (
  date: Date | string,
  pattern: string = "dd MMM, yyyy",
): string => {
  const dateObj = new Date(date);
  const output = format(dateObj, pattern, { locale: es });
  return output;
};

export default dateFormat;
