import { AnimatePresence, motion } from 'framer-motion';
import { roles } from '../data/roles';
import type { WorldDefExtended } from '../data/worlds';
import { COUNTRY_LABELS } from '../lib/labels';
import { parkSpecificPerks } from '../../../data/employeePerks';
import type { CountryKey, RoleId, WorldPark } from '../types';

interface ParkOverlayProps {
  park: WorldPark;
  role: RoleId;
  world: WorldDefExtended;
}

export function ParkOverlay({ park, role, world }: ParkOverlayProps) {
  const def = roles[role];
  const countryLabel =
    COUNTRY_LABELS[park.country as CountryKey] ?? park.countryLabel;
  const location =
    park.region === 'algemeen'
      ? countryLabel
      : `${park.regionLabel} · ${countryLabel}`;
  const highlight = parkSpecificPerks[park.id]?.highlight;

  return (
    <AnimatePresence mode="popLayout">
      <motion.div
        key={`${park.id}-${role}`}
        className="takeover-park"
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -8 }}
        transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
      >
        <span className="takeover-park__location">{location}</span>

        <h2 className="takeover-park__name">{park.name}</h2>

        {highlight && (
          <span className="takeover-park__highlight">{highlight}</span>
        )}

        <p className="takeover-park__intro">{world.intro}</p>

        <div className="takeover-park__cols">
          <div className="takeover-park__col">
            <span className="takeover-park__col-label">
              {def.label} · het werk
            </span>
            <ul className="takeover-park__perks takeover-park__perks--hard">
              {def.reality.map((line, i) => (
                <li key={i}>{line}</li>
              ))}
            </ul>
          </div>

          <div className="takeover-park__col">
            <span className="takeover-park__col-label">Wat je krijgt</span>
            <ul className="takeover-park__perks">
              {def.perks.slice(0, 3).map((perk, i) => (
                <li key={i}>{perk}</li>
              ))}
            </ul>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
