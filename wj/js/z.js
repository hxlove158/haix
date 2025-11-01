 tailwind.config = {
            theme: {
                extend: {
                    colors: {
                        love: {
                            pink: '#FF6B8B',
                            purple: '#8A2BE2',
                            gold: '#FFD700',
                            light: 'rgb(255, 240, 243)',
                            dark: '#333333'
                        }
                    },
                    fontFamily: {
                        handwriting: ['Segoe Script', 'Brush Script MT', 'cursive'],
                        serif: ['Georgia', 'Cambria', 'serif'],
                        sans: ['Inter', 'system-ui', 'sans-serif']
                    },
                    animation: {
                        'heartbeat': 'heartbeat 1.5s ease-in-out infinite',
                        'fade-in': 'fadeIn 0.8s ease-out forwards',
                        'slide-up': 'slideUp 0.8s ease-out forwards',
                        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite'
                    },
                    keyframes: {
                        heartbeat: {
                            '0%, 100%': { transform: 'scale(1)' },
                            '50%': { transform: 'scale(1.1)' }
                        },
                        fadeIn: {
                            '0%': { opacity: '0' },
                            '100%': { opacity: '1' }
                        },
                        slideUp: {
                            '0%': { transform: 'translateY(20px)', opacity: '0' },
                            '100%': { transform: 'translateY(0)', opacity: '1' }
                        }
                    }
                }
            }
        }