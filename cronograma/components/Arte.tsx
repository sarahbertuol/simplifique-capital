"use client";

import { useEffect, useMemo, useRef } from "react";
import type { Post } from "@/data/posts";
import { desenharPeca, pecasDoPost, PROPORCAO } from "@/lib/arte";
import { familiaDisplay } from "@/lib/fonte";

/**
 * A arte de uma peça, desenhada em canvas na resolução da tela.
 *
 * Recebe `post` e `indice` em vez do objeto da peça pronto: são valores
 * estáveis, e assim o efeito de desenho não redispara a cada renderização do
 * componente pai.
 */
export default function Arte({
  post,
  indice = 0,
  className = "",
}: {
  post: Post;
  indice?: number;
  className?: string;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const peca = useMemo(() => pecasDoPost(post)[indice], [post, indice]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    let vivo = true;
    const familia = familiaDisplay();

    function desenhar() {
      if (!vivo || !canvas) return;
      const larguraCss = canvas.clientWidth;
      if (!larguraCss) return;
      // Acima de 2x o ganho visual não paga a memória, ainda mais com uma
      // grade inteira de canvas na tela.
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const largura = Math.round(larguraCss * dpr);
      canvas.width = largura;
      canvas.height = Math.round(largura * PROPORCAO);
      const ctx = canvas.getContext("2d");
      if (ctx) desenharPeca(ctx, peca, largura, familia);
    }

    desenhar();
    // A primeira passada pode pegar a fonte de fallback; redesenha quando a
    // Poppins terminar de carregar.
    document.fonts.ready.then(desenhar);

    const observador = new ResizeObserver(desenhar);
    observador.observe(canvas);
    return () => {
      vivo = false;
      observador.disconnect();
    };
  }, [peca]);

  return (
    <canvas
      ref={canvasRef}
      role="img"
      aria-label={peca.texto}
      className={`block w-full ${className}`}
      style={{ aspectRatio: "4 / 5" }}
    />
  );
}
