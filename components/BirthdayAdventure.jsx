import React, { useState } from 'react';
import { ChevronDown, Heart } from 'lucide-react';

export default function BirthdayAdventure() {
  const [selectedVibe, setSelectedVibe] = useState(null);
  const [selectedChapters, setSelectedChapters] = useState({});

  const vibes = {
    santaMonica: {
      name: "Santa Monica",
      tagline: "Soft, pretty, no pressure",
      subtitle: "Tea, vintage, ocean walk. A gentle local birthday.",
      color: "#FFF5F0",
      accentColor: "#C9654C",
      lightAccent: "#F4997D",
      emoji: "☕",
      chapters: [
        {
          id: "coffee",
          title: "Soft Landing",
          icon: "☕",
          options: [
            "Buena Vida Tea Bar & Garden – soft start, tea, garden, calm",
            "Goodboybob Coffee Roasters – creative, serious coffee"
          ]
        },
        {
          id: "vintage",
          title: "Vintage Hunt",
          icon: "✨",
          options: [
            "Divine Vintage – curated, beautiful, birthday-special pieces",
            "Great Labels – elevated consignment, designer finds",
            "Assistance League Thrift Shop – nonprofit treasure hunt",
            "Chelsea Vintage / Carny Couture – quick vintage without commitment",
            "2nd Street Santa Monica – resale, trying things on for fun"
          ]
        },
        {
          id: "books",
          title: "Inner Reset",
          icon: "📖",
          options: [
            "Angel City Books & Records – used books/records for a reset",
            "Palisades Park – ocean bluff walk and photos"
          ]
        },
        {
          id: "food",
          title: "Eating",
          icon: "🍽️",
          options: [
            "Late breakfast / brunch on Montana Ave",
            "Early dinner somewhere grown and coastal (not sceney)"
          ]
        }
      ]
    },
    encinitas: {
      name: "Encinitas",
      tagline: "Most magical, low-pressure",
      subtitle: "Coastal drive, coffee, treasures, meditation, beach.",
      color: "#F0F8FF",
      accentColor: "#4C8FC9",
      lightAccent: "#7DCEF4",
      emoji: "🌊",
      chapters: [
        {
          id: "drive",
          title: "Arrival",
          icon: "🚗",
          options: [
            "Leave mid-morning for late-morning arrival (feels like a treat, not a slog)"
          ]
        },
        {
          id: "coffee",
          title: "Soft Landing",
          icon: "☕",
          options: [
            "Lofty Coffee – relaxed coastal café/brunch energy",
            "Pannikin Coffee & Tea – in a converted railroad station, memorable"
          ]
        },
        {
          id: "vintage",
          title: "Treasure Hunt",
          icon: "✨",
          options: [
            "Thrifty Threads – casual coastal resale",
            "Assistance League Rancho San Dieguito – vintage, antiques, housewares",
            "CRC Resale Store – practical rummaging",
            "Encinitas Antique Mall – clothing, jewelry, home decor"
          ]
        },
        {
          id: "beauty",
          title: "Quiet Chapter",
          icon: "🧘",
          options: [
            "Self-Realization Fellowship Meditation Gardens – ocean views, gardens, calm",
            "Moonlight State Beach – iconic, easy, walkable",
            "Swami's Beach overlook – short, beautiful viewpoint",
            "San Diego Botanic Garden – immerse in plants"
          ]
        },
        {
          id: "food",
          title: "Eating",
          icon: "🍽️",
          options: [
            "Casual daytime food in downtown Encinitas",
            "Early dinner (cozy or slightly celebratory)"
          ]
        }
      ]
    },
    laJolla: {
      name: "La Jolla",
      tagline: "Beaches, galleries, villages, coves",
      subtitle: "Ocean views, vintage, bookstores, galleries, sea cliffs.",
      color: "#F5F0FF",
      accentColor: "#8C4CA6",
      lightAccent: "#D97DEC",
      emoji: "🎨",
      chapters: [
        {
          id: "coffee",
          title: "Ocean View Start",
          icon: "☕",
          options: [
            "Destiny Coast Cafe – oceanfront dining with sea views",
            "Caroline's Seaside Café – ocean-view breakfast/brunch",
            "Brick & Bell – cozy café option"
          ]
        },
        {
          id: "vintage",
          title: "Vintage & Antiques",
          icon: "✨",
          options: [
            "Vintage Threads & Grails – La Jolla vintage near the ocean",
            "Boulevard Boutique La Jolla – designer resale and consignment",
            "Ark Antiques – jewelry, furniture, fine art",
            "Girard Avenue Marketplace – curated vintage, antiques, garden"
          ]
        },
        {
          id: "books",
          title: "Brainy Stop",
          icon: "📖",
          options: [
            "D.G. Wills Books – La Jolla's largest collection, used and new"
          ]
        },
        {
          id: "art",
          title: "Gallery Stroll",
          icon: "🎨",
          options: [
            "La Jolla gallery district – 25+ galleries, monthly Art Walk",
            "Peter Lik Gallery – fine art photography in the heart of Village"
          ]
        },
        {
          id: "beaches",
          title: "Scenic Beaches",
          icon: "🌊",
          options: [
            "La Jolla Cove – top beaches in the U.S., coves, cliffs, sea lions",
            "La Jolla Shores – long sandy beach, easier walk",
            "Torrey Pines State Beach – dramatic cliffs, coastal trails"
          ]
        },
        {
          id: "food",
          title: "Eating",
          icon: "🍽️",
          options: [
            "Oceanfront or Village dinner with gallery walks nearby",
            "Sunset at the Cove"
          ]
        }
      ]
    },
    barrio: {
      name: "Barrio Logan",
      tagline: "Murals, culture, inspiration",
      subtitle: "Coffee, Chicano Park, handmade shops, no body-focus.",
      color: "#F0FFF0",
      accentColor: "#4CA64C",
      lightAccent: "#7DD47D",
      emoji: "🎭",
      chapters: [
        {
          id: "coffee",
          title: "Coffee & Vibes",
          icon: "☕",
          options: [
            "Por Vida Coffee – artsy, community-focused"
          ]
        },
        {
          id: "art",
          title: "Color & Culture",
          icon: "🎨",
          options: [
            "Chicano Park murals – walk and absorb the art",
            "Simón Limón and nearby shops – handmade, local"
          ]
        },
        {
          id: "optional",
          title: "Optional Add-Ons",
          icon: "✨",
          options: [
            "Add a La Jolla or Encinitas beach stop before or after",
            "Pair with a North Park vintage stop (Day to Day Vintage) if inspiration hits"
          ]
        }
      ]
    }
  };

  const toggleChapter = (vibeKey, chapterId) => {
    setSelectedChapters(prev => ({
      ...prev,
      [chapterId]: !prev[chapterId]
    }));
  };

  const handleVibeSelect = (vibeKey) => {
    setSelectedVibe(selectedVibe === vibeKey ? null : vibeKey);
    setSelectedChapters({});
  };

  const renderSelectedSummary = () => {
    if (!selectedVibe) return null;

    const vibe = vibes[selectedVibe];
    const activeChapters = Object.keys(selectedChapters)
      .filter(key => selectedChapters[key])
      .map(key => {
        const chapter = vibe.chapters.find(c => c.id === key);
        return chapter;
      })
      .filter(Boolean);

    if (activeChapters.length === 0) return null;

    return (
      <div style={{
        marginTop: '2rem',
        padding: '2rem',
        background: 'white',
        borderRadius: '1rem',
        border: `2px solid ${vibe.accentColor}`,
        boxShadow: '0 4px 12px rgba(0,0,0,0.08)'
      }}>
        <h3 style={{
          fontSize: 'clamp(1.25rem, 4vw, 1.5rem)',
          fontWeight: '700',
          color: vibe.accentColor,
          marginBottom: '1.5rem',
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem',
          margin: '0 0 1.5rem 0'
        }}>
          <Heart size={28} aria-hidden="true" />
          Your {vibe.name} Day
        </h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          {activeChapters.map(chapter => (
            <div key={chapter.id} style={{ borderBottom: `1px solid ${vibe.color}`, paddingBottom: '1rem' }}>
              <h4 style={{
                color: vibe.accentColor,
                fontWeight: '700',
                fontSize: '1.125rem',
                marginBottom: '0.5rem',
                margin: '0 0 0.5rem 0'
              }}>
                {chapter.icon} {chapter.title}
              </h4>
              <p style={{
                color: '#555',
                fontSize: '1rem',
                margin: '0',
                lineHeight: '1.6'
              }}>
                You're interested in this. Pick the vibe when you get there.
              </p>
            </div>
          ))}
        </div>
        <p style={{
          marginTop: '1.5rem',
          fontSize: '1rem',
          color: '#666',
          fontStyle: 'italic',
          textAlign: 'center'
        }}>
          No pressure to hit everything. We follow what feels good. ✨
        </p>
      </div>
    );
  };

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(180deg, #FFFBF8 0%, #F8F5FF 100%)',
      padding: 'clamp(1.5rem, 5vw, 2.5rem)',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", "Helvetica Neue", sans-serif'
    }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@400;600;700&family=Outfit:wght@400;500;600;700&display=swap');

        * {
          box-sizing: border-box;
        }

        h1, h2, h3, h4 {
          font-family: 'Outfit', sans-serif;
          margin: 0;
        }

        body {
          font-size: 16px;
          line-height: 1.6;
        }

        @media (max-width: 640px) {
          html {
            font-size: 16px;
          }
        }

        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }

        @keyframes slideDown {
          from { opacity: 0; max-height: 0; }
          to { opacity: 1; max-height: 2000px; }
        }

        .vibe-card {
          animation: fadeIn 0.5s ease-out;
        }

        .chapter-list {
          animation: slideDown 0.4s ease-out;
        }

        button {
          transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
          font-size: 1rem;
        }

        button:hover {
          transform: translateY(-2px);
        }

        button:active {
          transform: translateY(0);
        }

        button:focus {
          outline: 3px solid currentColor;
          outline-offset: 2px;
        }

        input[type="checkbox"] {
          width: 24px;
          height: 24px;
          cursor: pointer;
          margin-right: 0.5rem;
        }

        input[type="checkbox"]:focus {
          outline: 3px solid;
          outline-offset: 2px;
        }

        .chapter-option {
          transition: all 0.2s ease;
        }

        .chapter-option:hover {
          transform: translateX(4px);
        }

        @media (max-width: 768px) {
          h1 {
            font-size: clamp(1.75rem, 6vw, 2.5rem);
          }

          h2 {
            font-size: clamp(1.5rem, 5vw, 2rem);
          }

          h3, h4 {
            font-size: clamp(1.125rem, 4vw, 1.5rem);
          }

          p {
            font-size: clamp(1rem, 3vw, 1.1rem);
          }
        }
      `}</style>

      <div style={{ maxWidth: '900px', margin: '0 auto' }}>
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
          <p style={{
            fontSize: '1rem',
            letterSpacing: '0.1em',
            color: '#8C4CA6',
            fontWeight: '600',
            textTransform: 'uppercase',
            margin: '0 0 1rem 0'
          }}>
            Choose Your Birthday Adventure
          </p>
          <h1 style={{
            fontSize: 'clamp(2rem, 6vw, 3rem)',
            fontWeight: '700',
            color: '#333',
            margin: '0 0 1rem 0',
            lineHeight: '1.2'
          }}>
            Four Coastal Vibes
          </h1>
          <p style={{
            fontSize: 'clamp(1rem, 3vw, 1.125rem)',
            color: '#666',
            maxWidth: '500px',
            margin: '0 auto',
            lineHeight: '1.6'
          }}>
            No pressure to buy anything or try anything on. I just want a beautiful day with you where we follow what feels good.
          </p>
        </div>

        {/* Vibe Cards */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem', marginBottom: '2rem' }}>
          {Object.entries(vibes).map(([key, vibe]) => (
            <div key={key} className="vibe-card">
              <button
                onClick={() => handleVibeSelect(key)}
                aria-expanded={selectedVibe === key}
                aria-controls={`${key}-chapters`}
                style={{
                  width: '100%',
                  background: vibe.color,
                  border: `2px solid ${vibe.accentColor}`,
                  padding: 'clamp(1.5rem, 4vw, 2rem)',
                  borderRadius: '1rem',
                  cursor: 'pointer',
                  textAlign: 'left',
                  boxShadow: selectedVibe === key ? `0 8px 24px ${vibe.accentColor}30` : '0 2px 8px rgba(0,0,0,0.06)',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'flex-start',
                  gap: '1rem',
                  minHeight: '100px'
                }}
              >
                <div>
                  <h2 style={{
                    fontSize: 'clamp(1.5rem, 4vw, 2rem)',
                    fontWeight: '700',
                    color: '#333',
                    margin: '0 0 0.5rem 0',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem'
                  }}>
                    {vibe.emoji} {vibe.name}
                  </h2>
                  <p style={{
                    fontSize: 'clamp(1rem, 3vw, 1.0625rem)',
                    fontWeight: '600',
                    color: vibe.accentColor,
                    margin: '0.25rem 0 0.75rem 0',
                    letterSpacing: '0.02em'
                  }}>
                    {vibe.tagline}
                  </p>
                  <p style={{
                    fontSize: 'clamp(0.95rem, 3vw, 1rem)',
                    color: '#555',
                    margin: '0',
                    fontWeight: '400',
                    lineHeight: '1.5'
                  }}>
                    {vibe.subtitle}
                  </p>
                </div>
                <div style={{
                  fontSize: '1.5rem',
                  color: vibe.accentColor,
                  transform: selectedVibe === key ? 'rotate(180deg)' : 'rotate(0deg)',
                  transition: 'transform 0.3s ease',
                  flexShrink: 0,
                  marginTop: '0.5rem'
                }} aria-hidden="true">
                  <ChevronDown size={32} />
                </div>
              </button>

              {/* Expanded Chapters */}
              {selectedVibe === key && (
                <div
                  id={`${key}-chapters`}
                  className="chapter-list"
                  style={{
                    background: 'white',
                    borderRadius: '1rem',
                    padding: 'clamp(1.5rem, 4vw, 2rem)',
                    border: `2px solid ${vibe.accentColor}`,
                    boxShadow: '0 4px 12px rgba(0,0,0,0.08)'
                  }}
                >
                  <p style={{
                    fontSize: 'clamp(1rem, 3vw, 1.0625rem)',
                    color: '#666',
                    marginBottom: '1.5rem',
                    fontStyle: 'italic',
                    margin: '0 0 1.5rem 0'
                  }}>
                    Pick the chapters that call to you. We can skip anything, or discover something new.
                  </p>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                    {vibe.chapters.map(chapter => (
                      <fieldset
                        key={chapter.id}
                        style={{
                          border: 'none',
                          padding: '0',
                          margin: '0'
                        }}
                      >
                        <legend style={{ margin: '0 0 0.75rem 0' }}>
                          <label style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.75rem',
                            cursor: 'pointer',
                            fontSize: 'clamp(1rem, 3vw, 1.125rem)',
                            fontWeight: '600',
                            color: '#333'
                          }}>
                            <input
                              type="checkbox"
                              checked={selectedChapters[chapter.id] || false}
                              onChange={() => toggleChapter(key, chapter.id)}
                              aria-label={`Select ${chapter.title} chapter`}
                              style={{
                                accentColor: vibe.accentColor
                              }}
                            />
                            {chapter.icon} {chapter.title}
                          </label>
                        </legend>

                        {selectedChapters[chapter.id] && (
                          <div style={{
                            marginLeft: 'clamp(1.5rem, 4vw, 2.5rem)',
                            paddingLeft: '1rem',
                            borderLeft: `2px solid ${vibe.accentColor}40`,
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '0.75rem'
                          }}>
                            {chapter.options.map((option, idx) => (
                              <p key={idx} className="chapter-option" style={{
                                fontSize: 'clamp(1rem, 3vw, 1.0625rem)',
                                color: '#555',
                                margin: '0',
                                lineHeight: '1.6'
                              }}>
                                • {option}
                              </p>
                            ))}
                          </div>
                        )}
                      </fieldset>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Summary */}
        {renderSelectedSummary()}

        {/* Closing */}
        <div style={{
          textAlign: 'center',
          marginTop: '3rem',
          paddingTop: '2rem',
          borderTop: '2px solid #ddd'
        }}>
          <p style={{
            fontSize: 'clamp(1rem, 3vw, 1.125rem)',
            color: '#666',
            lineHeight: '1.8',
            maxWidth: '500px',
            margin: '0 auto'
          }}>
            My vote: <strong>Encinitas or La Jolla</strong> for max birthday magic, with Santa Monica as the soft local option.
            <br />
            <br />
            <em>But it's your day. Pick what calls to you.</em>
          </p>
        </div>
      </div>
    </div>
  );
}
