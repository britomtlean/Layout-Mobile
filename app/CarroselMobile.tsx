'use client';

import { useRef, useState } from 'react';

type CarrosselProps = {
    itens: React.ReactNode[];
};

export default function Carrossel({ itens }: CarrosselProps) {
    const carrosselRef = useRef<HTMLDivElement>(null);
    const [indice, setIndice] = useState(0);

    const itensVisiveis = 3;
    const maxIndice = Math.max(0, itens.length - itensVisiveis);

    function atualizarIndice() {
        const elemento = carrosselRef.current;

        if (!elemento) return;

        const larguraItem = elemento.clientWidth / itensVisiveis;
        const novoIndice = Math.round(
            elemento.scrollLeft / larguraItem
        );

        setIndice(Math.min(maxIndice, Math.max(0, novoIndice)));
    }

    function navegar(direcao: number) {
        const elemento = carrosselRef.current;

        if (!elemento) return;

        const larguraItem = elemento.clientWidth / itensVisiveis;

        elemento.scrollTo({
            left: (indice + direcao) * larguraItem,
            behavior: 'smooth',
        });
    }

    return (
        <section className="w-full">

            <div className="relative">
                {/* Carrossel */}
                <div
                    ref={carrosselRef}
                    onScroll={atualizarIndice}
                    className="
                        flex w-full overflow-x-auto
                        snap-x snap-mandatory
                        scroll-smooth
                        [scrollbar-width:none]
                        [&::-webkit-scrollbar]:hidden
                        touch-pan-x
                    "
                >
                    {itens.map((item, index) => (
                        <div
                            key={index}
                            className="
                                box-border w-1/3 min-w-0
                                shrink-0 snap-start
                                p-1
                            "
                        >
                            <div className="h-[200px]! w-full overflow-hidden rounded-xl">
                                {item}
                            </div>
                        </div>
                    ))}
                </div>

                {/* Botão anterior */}
                <button
                    type="button"
                    onClick={() => navegar(-1)}
                    disabled={indice === 0}
                    aria-label="Item anterior"
                    className="
                        absolute left-1 top-1/2 z-10
                        -translate-y-1/2
                        rounded-full bg-black/70
                        p-2 text-white
                        disabled:opacity-30
                    "
                >
                    &#10094;
                </button>

                {/* Botão próximo */}
                <button
                    type="button"
                    onClick={() => navegar(1)}
                    disabled={indice >= maxIndice}
                    aria-label="Próximo item"
                    className="
                        absolute right-1 top-1/2 z-10
                        -translate-y-1/2
                        rounded-full bg-black/70
                        p-2 text-white
                        disabled:opacity-30
                    "
                >
                    &#10095;
                </button>
            </div>

            {/* Indicadores */}
            <div className="mt-3! flex justify-center gap-2 py-3!">
                {Array.from(
                    { length: maxIndice + 1 },
                    (_, index) => (
                        <button
                            key={index}
                            type="button"
                            onClick={() => {
                                const elemento = carrosselRef.current;
                                if (!elemento) return;

                                elemento.scrollTo({
                                    left:
                                        index *
                                        (elemento.clientWidth / itensVisiveis),
                                    behavior: 'smooth',
                                });
                            }}
                            aria-label={`Ir para posição ${index + 1}`}
                            aria-current={indice === index ? 'true' : undefined}
                            className={`h-2 rounded-full transition-all ${
                                indice === index
                                    ? 'w-6 bg-blue-600'
                                    : 'w-2 bg-gray-400'
                            }`}
                        />
                    )
                )}
            </div>
        </section>
    );
}
