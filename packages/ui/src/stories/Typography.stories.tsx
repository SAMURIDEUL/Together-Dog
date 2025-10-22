import type { Meta, StoryObj } from '@storybook/react';

import { typography } from '../tokens/typography';

const meta: Meta = {
  title: 'Design Tokens/Typography',
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          '프로젝트 전역에서 사용되는 폰트 크기, 행간(line-height), 자간(letter-spacing)을 정리한 문서입니다.',
      },
    },
  },
};

export default meta;
type Story = StoryObj;

export const TypographyGuide: Story = {
  render: () => (
    <div style={{ padding: '2rem', maxWidth: '800px' }}>
      <h2 style={{ marginBottom: '1rem' }}>✨ Typography Tokens</h2>
      <table
        style={{
          width: '100%',
          borderCollapse: 'collapse',
          fontFamily: 'var(--font-primary)',
          fontSize: '0.95rem',
        }}
      >
        <thead>
          <tr style={{ textAlign: 'left', borderBottom: '2px solid #ddd' }}>
            <th style={{ padding: '0.5rem' }}>Token</th>
            <th style={{ padding: '0.5rem' }}>Size</th>
            <th style={{ padding: '0.5rem' }}>Line Height</th>
            <th style={{ padding: '0.5rem' }}>Letter Spacing</th>
            <th style={{ padding: '0.5rem' }}>Preview</th>
          </tr>
        </thead>
        <tbody>
          {Object.keys(typography.size).map((key) => (
            <tr key={key} style={{ borderBottom: '1px solid #eee' }}>
              <td style={{ padding: '0.5rem', fontWeight: 600 }}>{key}</td>
              <td style={{ padding: '0.5rem' }}>
                {typography.size[key as keyof typeof typography.size]}
              </td>
              <td style={{ padding: '0.5rem' }}>
                {
                  typography.lineHeight[
                    key as keyof typeof typography.lineHeight
                  ]
                }
              </td>
              <td style={{ padding: '0.5rem' }}>
                {typography.tracking[key as keyof typeof typography.tracking]}
              </td>
              <td style={{ padding: '0.5rem' }}>
                <div
                  style={{
                    fontSize:
                      typography.size[key as keyof typeof typography.size],
                    lineHeight:
                      typography.lineHeight[
                        key as keyof typeof typography.lineHeight
                      ],
                    letterSpacing:
                      typography.tracking[
                        key as keyof typeof typography.tracking
                      ],
                  }}
                >
                  예시 텍스트
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  ),
};
