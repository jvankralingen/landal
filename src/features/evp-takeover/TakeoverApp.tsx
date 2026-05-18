import { useState } from 'react';
import { HeroHeadline } from './components/HeroHeadline';
import { ChoiceStrip } from './components/ChoiceStrip';
import { ParkOverlay } from './components/ParkOverlay';
import { AmbientAudio } from './components/AmbientAudio';
import { AudioToggle } from './components/AudioToggle';
import { MotifLayer } from './components/MotifLayer';
import { CollageLayer } from './components/CollageLayer';
import { SidePanel, PanelToggle } from './components/SidePanel';
import { RandomParkButton } from './components/RandomParkButton';
import { LandalLogo } from './components/LandalLogo';
import { ROLE_LABELS } from './lib/labels';
import { worlds } from './data/worlds';
import { roles } from './data/roles';
import { allWorldParks } from './data/parks';
import { getWorldForPark } from './lib/getWorldForPark';
import { getPark } from './lib/matchParkInWorld';
import { buildCollage } from './lib/buildCollage';
import type { RoleId, WorldId } from './types';
import './takeover.css';

const DEFAULT_PARK_BY_WORLD: Record<WorldId, string> = {
  forest: 'hoenderloo',
  coast: 'haamstede',
  meer: 'sneekermeer',
  wadden: 'ameland_state',
  family: 'hof_van_saksen',
  premium: 'cuber_veluwe',
  wellness: 'marber',
  mountain: 'dachstein',
  uk: 'marwell_resort',
};

const parksByWorld: Map<WorldId, string[]> = (() => {
  const map = new Map<WorldId, string[]>();
  for (const p of allWorldParks) {
    const w = getWorldForPark(p);
    const arr = map.get(w) ?? [];
    arr.push(p.id);
    map.set(w, arr);
  }
  return map;
})();

function representativePark(worldId: WorldId): string {
  const preferred = DEFAULT_PARK_BY_WORLD[worldId];
  const list = parksByWorld.get(worldId) ?? [];
  if (preferred && list.includes(preferred)) return preferred;
  return list[0] ?? allWorldParks[0]?.id ?? '';
}

function initialAudioFlag(): boolean {
  if (typeof window === 'undefined') return false;
  const params = new URLSearchParams(window.location.search);
  return params.get('audio') === '1';
}

const DARK_TONE_WORLDS = new Set<WorldId>(['premium', 'mountain']);

interface AppState {
  worldId: WorldId;
  role: RoleId;
  parkId: string;
}

export default function TakeoverApp() {
  const [audioEnabled, setAudioEnabled] = useState<boolean>(initialAudioFlag);
  const [panelOpen, setPanelOpen] = useState<boolean>(false);

  const [state, setState] = useState<AppState>(() => ({
    worldId: 'forest',
    role: 'horeca',
    parkId: representativePark('forest'),
  }));

  const park = getPark(state.parkId);
  const world = worlds[state.worldId];

  const headline = park ? `Werken bij Landal ${park.name}` : '';

  const handleWorldChange = (worldId: WorldId) =>
    setState((s) =>
      s.worldId === worldId
        ? s
        : { ...s, worldId, parkId: representativePark(worldId) }
    );

  const handleRoleChange = (role: RoleId) =>
    setState((s) => ({ ...s, role }));

  const handleRandomPark = () =>
    setState((prev) => {
      const others = allWorldParks.filter((p) => p.id !== prev.parkId);
      if (others.length === 0) return prev;
      const next = others[Math.floor(Math.random() * others.length)];
      return { ...prev, worldId: getWorldForPark(next), parkId: next.id };
    });

  if (!park) {
    return (
      <div className="takeover-root" data-world={state.worldId}>
        <div style={{ padding: 64 }}>Geen park gevonden.</div>
      </div>
    );
  }

  const tone = DARK_TONE_WORLDS.has(state.worldId) ? 'dark' : 'light';

  return (
    <div
      className="takeover-root"
      data-world={state.worldId}
      data-tone={tone}
      style={{
        ['--headline-font' as never]: world.font.headline,
        ['--body-font' as never]: world.font.body,
      }}
    >
      <div className="takeover-canvas" aria-hidden="true" />

      <CollageLayer
        tiles={buildCollage(world, roles[state.role], park)}
        cacheKey={`${state.worldId}-${park.id}-${state.role}`}
      />

      <MotifLayer
        worldId={state.worldId}
        region={park.region}
        cacheKey={`${state.worldId}-${park.region}`}
      />

      <div className="takeover-stage">
        <div className="takeover-top">
          <div className="takeover-brand">
            <LandalLogo height={56} />
          </div>
          <div className="takeover-top__right">
            <RandomParkButton onShuffle={handleRandomPark} />
            <AudioToggle
              enabled={audioEnabled && Boolean(world.audioSrc)}
              available={Boolean(world.audioSrc)}
              onToggle={() => setAudioEnabled((v) => !v)}
            />
            <PanelToggle
              open={panelOpen}
              onToggle={() => setPanelOpen((v) => !v)}
              summary={`${world.label} · ${ROLE_LABELS[state.role]}`}
            />
          </div>
        </div>

        <HeroHeadline
          headline={headline}
          cacheKey={`${state.worldId}-${state.parkId}-${headline.length}`}
        />

        <div className="takeover-bottom">
          <ParkOverlay park={park} role={state.role} world={world} />
        </div>
      </div>

      <SidePanel
        open={panelOpen}
        onClose={() => setPanelOpen(false)}
        title="Instellingen"
      >
        <ChoiceStrip
          worldId={state.worldId}
          role={state.role}
          onWorldChange={handleWorldChange}
          onRoleChange={handleRoleChange}
        />
      </SidePanel>

      <AmbientAudio
        worldId={state.worldId}
        audioSrc={world.audioSrc}
        enabled={audioEnabled}
      />
    </div>
  );
}
