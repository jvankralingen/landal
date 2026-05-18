import { motion } from 'framer-motion';
import { worldOrder, worlds } from '../data/worlds';
import { roleOrder, roles } from '../data/roles';
import type { RoleId, WorldId } from '../types';

interface ChoiceStripProps {
  worldId: WorldId;
  role: RoleId;
  onWorldChange: (id: WorldId) => void;
  onRoleChange: (id: RoleId) => void;
}

export function ChoiceStrip({
  worldId,
  role,
  onWorldChange,
  onRoleChange,
}: ChoiceStripProps) {
  return (
    <div className="takeover-controls" role="group" aria-label="Kies">
      <ChipRow
        label="Locatie"
        items={worldOrder.map((id) => ({ id, label: worlds[id].label }))}
        active={worldId}
        onSelect={(id) => onWorldChange(id as WorldId)}
        scopeId="world"
      />
      <ChipRow
        label="Rol"
        items={roleOrder.map((id) => ({ id, label: roles[id].label }))}
        active={role}
        onSelect={(id) => onRoleChange(id as RoleId)}
        scopeId="role"
      />
    </div>
  );
}

interface ChipRowProps {
  label: string;
  items: { id: string; label: string }[];
  active: string;
  onSelect: (id: string) => void;
  scopeId: string;
}

function ChipRow({ label, items, active, onSelect, scopeId }: ChipRowProps) {
  return (
    <div className="takeover-chiprow">
      <span className="takeover-chiprow__label">{label}</span>
      <div className="takeover-chiprow__list">
        {items.map((it) => {
          const isActive = it.id === active;
          return (
            <button
              key={it.id}
              type="button"
              onClick={() => onSelect(it.id)}
              className={
                'takeover-chip' + (isActive ? ' takeover-chip--active' : '')
              }
              aria-pressed={isActive}
            >
              {isActive && (
                <motion.span
                  layoutId={`chip-bg-${scopeId}`}
                  className="takeover-chip__bg"
                  transition={{
                    type: 'spring',
                    stiffness: 320,
                    damping: 32,
                    mass: 0.6,
                  }}
                />
              )}
              <span className="takeover-chip__label">{it.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
