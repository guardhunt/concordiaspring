import Cal from '@calcom/embed-react';

interface CalEmbedProps {
  calLink: string;
}

export default function CalEmbed({ calLink }: CalEmbedProps) {
  return <Cal calLink={calLink} style={{ width: '100%', minHeight: '600px' }} />;
}
