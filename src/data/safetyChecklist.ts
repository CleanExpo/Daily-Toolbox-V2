import type { ChecklistSection } from '@/types/safety';

export const sections: ChecklistSection[] = [
  {
    id: 'equipment',
    title: 'Equipment & Vehicle Safety',
    groups: [
      {
        id: 'equipment-storage',
        title: 'Equipment Storage & Security',
        items: [
          { id: 'equipment-secure', text: 'Equipment properly strapped down and secured', critical: true },
          { id: 'load-distribution', text: 'Load properly distributed and balanced', critical: true },
          { id: 'secure-storage', text: 'Storage compartments properly latched and locked', critical: true }
        ]
      },
      {
        id: 'chemicals',
        title: 'Chemical Management',
        items: [
          { id: 'chemicals-storage', text: 'Chemicals stored correctly and appropriate for tasks', critical: true },
          { id: 'msds-available', text: 'Safety Data Sheets (SDS) readily available', critical: true },
          { id: 'chemical-inventory', text: 'Chemical inventory checked and documented', critical: true }
        ]
      },
      {
        id: 'cleaning-equipment',
        title: 'Cleaning Equipment',
        items: [
          { id: 'vacuum-check', text: 'Vacuums operational with proper filtration', critical: true },
          { id: 'mops-brooms', text: 'Mops and brooms in good condition', critical: true },
          { id: 'extraction-machine', text: 'Extraction machine tested and functioning', critical: true }
        ]
      },
      {
        id: 'tools-equipment',
        title: 'Tools & Technical Equipment',
        items: [
          { id: 'moisture-meters', text: 'Moisture detection equipment calibrated', critical: true },
          { id: 'power-tools', text: 'Power tools inspected and tested', critical: true },
          { id: 'extension-cords', text: 'Extension cords checked for damage', critical: true },
          { id: 'ladders-check', text: 'Ladders inspected and secured properly', critical: true },
          { id: 'rcds-check', text: "RCD's tested and working (min 5 per truck)", critical: true }
        ]
      },
      {
        id: 'supplies',
        title: 'Supplies & Sundries',
        items: [
          { id: 'ppe-complete', text: 'PPE complete and in good condition', critical: true },
          { id: 'first-aid', text: 'First aid kit fully stocked', critical: true },
          { id: 'caution-tape', text: 'Caution tape and safety signage available', critical: true },
          { id: 'emergency-stock', text: 'Emergency response supplies stocked', critical: true }
        ]
      }
    ]
  },
  {
    id: 'vehicle',
    title: 'Vehicle Safety',
    groups: [
      {
        id: 'vehicle-checks',
        title: 'Vehicle Checks',
        items: [
          { id: 'vehicle-roadworthy', text: 'Vehicle is roadworthy and within service history', critical: true },
          { id: 'tires-check', text: 'Tires checked for punctures, pressure, and wear', critical: true },
          { id: 'lights-signals', text: 'All lights and signals functioning properly', critical: true },
          { id: 'brakes-check', text: 'Brakes and brake fluid checked', critical: true },
          { id: 'windscreen', text: 'Windscreen and wipers in good condition', critical: true }
        ]
      },
      {
        id: 'trailer-checks',
        title: 'Trailer Safety',
        items: [
          { id: 'trailer-hitch', text: 'Trailer properly hitched and secured', critical: true },
          { id: 'trailer-lights', text: 'Trailer lights and signals functioning', critical: true },
          { id: 'load-secure', text: 'Trailer load properly secured and balanced', critical: true },
          { id: 'trailer-brakes', text: 'Trailer brakes functioning correctly', critical: true },
          { id: 'trailer-tires', text: 'Trailer tires checked and properly inflated', critical: true }
        ]
      },
      {
        id: 'documentation',
        title: 'Vehicle Documentation',
        items: [
          { id: 'registration', text: 'Vehicle registration current and displayed', critical: true },
          { id: 'insurance', text: 'Insurance documentation up to date', critical: true },
          { id: 'permits', text: 'Required permits and licenses available', critical: true },
          { id: 'maintenance-log', text: 'Maintenance log book current', critical: true }
        ]
      }
    ]
  },
  {
    id: 'summer-safety',
    title: 'Summer Safety Measures',
    groups: [
      {
        id: 'heat-protection',
        title: 'Heat Protection',
        items: [
          { id: 'hydration', text: 'Water and hydration supplies available', critical: true },
          { id: 'cooling-equipment', text: 'Cooling equipment and shade structures ready', critical: true },
          { id: 'appropriate-clothing', text: 'Team equipped with appropriate summer clothing', critical: true },
          { id: 'sunscreen', text: 'Sunscreen and UV protection available', critical: true },
          { id: 'ventilation', text: 'Adequate ventilation systems operational', critical: true }
        ]
      },
      {
        id: 'break-schedule',
        title: 'Break Schedule',
        items: [
          { id: 'regular-breaks', text: 'Regular break schedule established', critical: true },
          { id: 'shaded-areas', text: 'Shaded break areas identified', critical: true },
          { id: 'heat-monitoring', text: 'Heat stress monitoring system in place', critical: true },
          { id: 'hydration-stations', text: 'Hydration stations set up and stocked', critical: true }
        ]
      },
      {
        id: 'emergency-response',
        title: 'Emergency Response',
        items: [
          { id: 'heat-stress-protocol', text: 'Heat stress response protocol reviewed', critical: true },
          { id: 'emergency-contacts', text: 'Emergency contact list updated and posted', critical: true },
          { id: 'first-aid-heat', text: 'Heat-specific first aid supplies available', critical: true },
          { id: 'evacuation-plan', text: 'Site evacuation plan communicated', critical: true }
        ]
      }
    ]
  }
];