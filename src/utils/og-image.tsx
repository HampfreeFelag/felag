import React from 'react';

// Nordic color palette (matching Nordic tokens)
const COLORS = {
	// Background (Scandinavian paper-like warmth)
	bgPrimary: '#F5F0EB',      // Light warm beige
	bgSecondary: '#E8E0D5',    // Lighter beige
	bgTertiary: '#D4C4B7',     // Muted beige
	
	// Nordic Blue
	deepBlue: '#3A5F7F',       // Deep Blue
	deepBlueLight: '#4A7BA7',  // Lighter variant
	deepBlueDark: '#2C3E4A',   // Darker variant
	
	// Amber
	amber: '#D49B3B',          // Amber - CTA
	amberLight: '#E5AF56',     // Lighter variant
	amberDark: '#B8862B',      // Darker variant
	
	// Moss Green
	mossGreen: '#6B7B5E',      // Moss Green
	
	// Text (for light theme)
	textPrimary: '#2C3E4A',    // Dark gray-blue
	textSecondary: '#5A6B7C',  // Muted gray-blue
	textTertiary: '#7A8B9C',   // Light gray
	
	// Semantic
	success: '#4CAF50',        // Green
	error: '#F44336',          // Red
	warning: '#FF9800',        // Orange
	info: '#2196F3',           // Blue
};

// Category background patterns (simplified for Satori)
const CATEGORY_COLORS: Record<string, string> = {
	'crypto': COLORS.deepBlue,
	'technical-analysis': COLORS.deepBlueDark,
	'algo-trading': COLORS.amber,
	'fundamental-analysis': COLORS.amberDark,
	'regulation': COLORS.mossGreen,
	'general': COLORS.deepBlue, // Default
};

// Background patterns (simplified gradients for Satori)
const getBackgroundPattern = (category: string = 'general'): string => {
	const patterns: Record<string, string> = {
		'crypto': `linear-gradient(135deg, ${COLORS.bgPrimary} 0%, rgba(58, 95, 127, 0.05) 50%, ${COLORS.bgPrimary} 100%)`,
		'technical-analysis': `${COLORS.bgPrimary}`, // Solid with grid effect (simplified)
		'algo-trading': `linear-gradient(135deg, ${COLORS.bgPrimary} 0%, rgba(212, 155, 59, 0.05) 50%, ${COLORS.bgPrimary} 100%)`,
		'fundamental-analysis': `${COLORS.bgPrimary}`,
		'general': `${COLORS.bgPrimary}`,
	};
	return patterns[category] || patterns['general'];
};

interface OGImageProps {
	title: string;
	subtitle?: string;
	category?: string;
	rubric?: string;
}

export function OGImageComponent({ title, subtitle, category = 'general', rubric }: OGImageProps) {
	const bgPattern = getBackgroundPattern(category);
	const categoryColor = CATEGORY_COLORS[category] || CATEGORY_COLORS['general'];
	const displayRubric = rubric || category.toUpperCase();

	return (
		<div
			style={{
				width: '100%',
				height: '100%',
				display: 'flex',
				flexDirection: 'column',
				justifyContent: 'space-between',
				background: bgPattern,
				padding: '60px',
				position: 'relative',
				overflow: 'hidden',
			}}
		>
			{/* Scanline overlay effect - subtle Nordic style */}
			<div
				style={{
					position: 'absolute',
					top: 0,
					left: 0,
					width: '100%',
					height: '100%',
					background: `repeating-linear-gradient(
						0deg,
						rgba(0, 0, 0, 0.03),
						rgba(0, 0, 0, 0.03) 1px,
						transparent 1px,
						transparent 4px
					)`,
					pointerEvents: 'none',
					zIndex: 1,
				}}
			/>

			{/* Grid pattern for technical-analysis */}
			{category === 'technical-analysis' && (
				<div
					style={{
						position: 'absolute',
						top: 0,
						left: 0,
						width: '100%',
						height: '100%',
						background: `repeating-linear-gradient(
							0deg,
							transparent,
							transparent 15px,
							${COLORS.textTertiary}20 15px,
							${COLORS.textTertiary}20 16px
						),
						repeating-linear-gradient(
							90deg,
							transparent,
							transparent 15px,
							${COLORS.textTertiary}20 15px,
							${COLORS.textTertiary}20 16px
						)`,
						pointerEvents: 'none',
						zIndex: 1,
					}}
				/>
			)}

			{/* Content */}
			<div
				style={{
					display: 'flex',
					flexDirection: 'column',
					justifyContent: 'flex-start',
					zIndex: 2,
					flex: 1,
				}}
			>
				{/* Title */}
				<h1
					style={{
						fontSize: '72px',
						fontWeight: '700',
						color: COLORS.deepBlueDark,
						margin: '0 0 20px 0',
						lineHeight: 1.4,
						textTransform: 'uppercase',
						fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, sans-serif',
					}}
				>
					{title}
				</h1>

				{/* Subtitle */}
				{subtitle && (
					<p
						style={{
							fontSize: '32px',
							fontWeight: '500',
							color: COLORS.textSecondary,
							margin: '0',
							opacity: 0.9,
							lineHeight: 1.6,
							fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, sans-serif',
							maxWidth: '900px',
						}}
					>
						{subtitle}
					</p>
				)}
			</div>

			{/* Bottom section: Category tag + Watermark */}
			<div
				style={{
					display: 'flex',
					justifyContent: 'space-between',
					alignItems: 'flex-start',
					marginTop: '40px',
					paddingTop: '30px',
					borderTop: `1px solid ${COLORS.textTertiary}30`,
					zIndex: 2,
				}}
			>
				{/* Category tag */}
				<span
					style={{
						fontSize: '24px',
						fontWeight: '600',
						padding: '12px 24px',
						backgroundColor: COLORS.bgSecondary,
						color: COLORS.deepBlue,
						border: `1px solid ${COLORS.textTertiary}30`,
						borderRadius: '8px',
						textTransform: 'uppercase',
						letterSpacing: '0.05em',
						fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, sans-serif',
						whiteSpace: 'nowrap',
					}}
				>
					[{displayRubric}]
				</span>

				{/* Watermark */}
				<span
					style={{
						fontSize: '20px',
						color: COLORS.textTertiary,
						opacity: 0.8,
						fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, sans-serif',
						fontWeight: 500,
						whiteSpace: 'nowrap',
					}}
				>
					FÉLAG
				</span>
			</div>
		</div>
	);
}
