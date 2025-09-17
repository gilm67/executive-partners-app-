import {getTranslations} from 'next-intl/server';

type Locale = 'en'|'fr'|'de';

export default async function LocalizedHome({
  params
}: {
  params: Promise<{locale: Locale}>
}) {
  const {locale} = await params;
  const t = await getTranslations({locale});

  return (
    <div>
      <h1 className="text-2xl font-semibold">{t('home.title', {default: 'Executive Partners'})}</h1>
      <p className="text-white/70">
        {t('home.subtitle', {default: 'Private Banking & Wealth Management Search'})}
      </p>
    </div>
  );
}
