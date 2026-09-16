import React from 'react';

/**
 * BiDi (Bidirectional) Text Utilities for Persian-English mixed layout.
 * Ensures IP addresses, MACs, commands, numbers, and multi-word English phrases
 * (like "Double NAT", "Zero Trust", "Port Forwarding") never invert in RTL contexts.
 */

export function wrapLtr(text: string | number): string {
  return `\u202A${text}\u202C`;
}

export function formatIpAddress(ip: string): string {
  return `\u202A${ip.trim()}\u202C`;
}

export function formatCidr(cidr: number): string {
  return `\u202A/${cidr}\u202C`;
}

export function formatMacAddress(mac: string): string {
  return `\u202A${mac.trim().toUpperCase()}\u202C`;
}

export function formatPort(port: number | string): string {
  return `\u202A${port}\u202C`;
}

export function toPersianDigits(num: number | string): string {
  const persianDigits = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'];
  return String(num).replace(/\d/g, (d) => persianDigits[parseInt(d, 10)]);
}

/**
 * Isolates Latin acronyms, numbers, parentheticals, and multi-word English phrases
 * so that RTL Persian sentences never invert words (e.g. "Double NAT" stays "Double NAT", not "NAT Double").
 */
export function renderBidiText(
  text: string,
  colorClass: string = 'text-indigo-600 dark:text-indigo-400'
): React.ReactNode {
  if (!text) return text;
  // 1. Matches complete parentheticals with English/numbers: (NAT & PAT), (Port Forwarding), (IDS vs IPS)
  // 2. Matches multi-word English phrases: "Double NAT", "Zero Trust", "CompTIA Network+", "Wi-Fi 6"
  const regex = /(\([A-Za-z0-9\s\&\/\-\.\+,]+\)|[A-Za-z][A-Za-z0-9\+\/\-\.\_]*(?:\s+[A-Za-z0-9\+\/\-\.\_]+)*)/g;

  const parts = text.split(regex);
  if (parts.length === 1) return text;

  return (
    <>
      {parts.map((part, index) => {
        if (!part) return null;
        if (regex.test(part)) {
          return (
            <bdi
              key={index}
              dir="ltr"
              className={`inline font-sans font-bold tracking-tight mx-0.5 ${colorClass}`}
            >
              {part}
            </bdi>
          );
        }
        return <span key={index}>{part}</span>;
      })}
    </>
  );
}
