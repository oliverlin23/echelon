import React, { useEffect, useRef, useState } from 'react';

interface NetworkBackgroundProps {
  className?: string;
}

interface Node {
  id: number;
  baseX: number;
  baseY: number;
  x: number;
  y: number;
  radius: number;
  type: 'small' | 'medium' | 'large';
  phase: number;
  amplitude: number;
  speed: number;
}

interface Edge {
  source: number;
  target: number;
  distance: number;
  opacity: number;
}

export const NetworkBackground: React.FC<NetworkBackgroundProps> = ({ className = '' }) => {
  const svgRef = useRef<SVGSVGElement>(null);
  const nodesRef = useRef<Node[]>([]);
  const edgesRef = useRef<Edge[]>([]);
  const scrollProgressRef = useRef(0);
  const animationFrameRef = useRef<number | null>(null);
  const [isInitialized, setIsInitialized] = useState(false);
  const [nodePositions, setNodePositions] = useState<{x: number, y: number}[]>([]);
  const [pulsingNodes, setPulsingNodes] = useState(new Set<number>());
  const [activeEdges, setActiveEdges] = useState(new Set<number>());

  const getDistance = (node1: Node, node2: Node): number => {
    const dx = node1.baseX - node2.baseX;
    const dy = node1.baseY - node2.baseY;
    return Math.sqrt(dx * dx + dy * dy);
  };

  const generateNodes = (): Node[] => {
    const nodeCount = 25;
    const width = 1200;
    const height = 800;
    const nodes: Node[] = [];
    
    for (let i = 0; i < nodeCount; i++) {
      const baseX = (Math.random() * 0.8 + 0.1) * width;
      const baseY = (Math.random() * 0.8 + 0.1) * height;
      
      let nodeType: 'small' | 'medium' | 'large' = 'small';
      let radius = 4;
      
      if (Math.random() < 0.3) {
        nodeType = 'medium';
        radius = 6;
      } else if (Math.random() < 0.1) {
        nodeType = 'large';
        radius = 8;
      }

      nodes.push({
        id: i,
        baseX,
        baseY,
        x: baseX,
        y: baseY,
        radius,
        type: nodeType,
        phase: Math.random() * Math.PI * 2,
        amplitude: Math.random() * 30 + 20,
        speed: Math.random() * 0.5 + 0.3
      });
    }
    
    return nodes;
  };

  const generateEdges = (nodes: Node[]): Edge[] => {
    const maxDistance = 150;
    const edges: Edge[] = [];
    
    for (let i = 0; i < nodes.length; i++) {
      for (let j = i + 1; j < nodes.length; j++) {
        const distance = getDistance(nodes[i], nodes[j]);
        
        if (distance < maxDistance) {
          edges.push({
            source: i,
            target: j,
            distance,
            opacity: Math.max(0.1, 1 - distance / maxDistance)
          });
        }
      }
    }
    
    return edges;
  };

  const updatePositions = () => {
    const time = Date.now() * 0.001;
    const nodes = nodesRef.current;
    const edges = edgesRef.current;
    const scrollProgress = scrollProgressRef.current;

    // Calculate new positions
    const newPositions = nodes.map((node) => {
      const scrollInfluence = scrollProgress * 100;
      
      const x = node.baseX + 
        Math.sin(time * node.speed + node.phase) * node.amplitude * (1 + scrollProgress) +
        Math.cos(scrollProgress * Math.PI * 2) * scrollInfluence;
        
      const y = node.baseY + 
        Math.cos(time * node.speed + node.phase + Math.PI/3) * node.amplitude * (1 + scrollProgress) +
        Math.sin(scrollProgress * Math.PI * 2) * scrollInfluence * 0.5;

      return { x, y };
    });

    // Update only the state - this is our single source of truth
    setNodePositions(prev => newPositions);

    // Trigger random effects
    if (scrollProgress > 0.3 && Math.random() < 0.02) {
      const randomNodeIndex = Math.floor(Math.random() * nodes.length);
      setPulsingNodes(prev => new Set([...prev, randomNodeIndex]));
      setTimeout(() => {
        setPulsingNodes(prev => {
          const newSet = new Set(prev);
          newSet.delete(randomNodeIndex);
          return newSet;
        });
      }, 2000);
    }

    if (scrollProgress > 0.5 && Math.random() < 0.01) {
      const randomEdgeIndex = Math.floor(Math.random() * edges.length);
      setActiveEdges(prev => new Set([...prev, randomEdgeIndex]));
      setTimeout(() => {
        setActiveEdges(prev => {
          const newSet = new Set(prev);
          newSet.delete(randomEdgeIndex);
          return newSet;
        });
      }, 1000);
    }
  };

  const animate = () => {
    updatePositions();
    animationFrameRef.current = requestAnimationFrame(animate);
  };

  // Initialize network
  useEffect(() => {
    const nodes = generateNodes();
    const edges = generateEdges(nodes);
    
    nodesRef.current = nodes;
    edgesRef.current = edges;
    
    // Initialize positions state with base positions
    const initialPositions = nodes.map(node => ({ x: node.baseX, y: node.baseY }));
    nodes.forEach((node, index) => {
      node.x = node.baseX;
      node.y = node.baseY;
    });
    setNodePositions(initialPositions);
    setIsInitialized(true);
    
    // Start animation
    animate();
    
    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, []);

  // Scroll listener
  useEffect(() => {
    let ticking = false;
    
    const updateScrollProgress = () => {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      scrollProgressRef.current = Math.min(scrollTop / scrollHeight, 1);
      ticking = false;
    };

    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(updateScrollProgress);
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className={`absolute inset-0 overflow-hidden ${className}`}>
      <style jsx>{`
        .network-svg {
          width: 100%;
          height: 100%;
        }

        .node {
          fill: #6b7280;
          stroke: #4b5563;
          stroke-width: 1.5;
          filter: drop-shadow(0 0 4px rgba(107, 114, 128, 0.3));
        }

        .node.large {
          fill: #374151;
          stroke: #1f2937;
          filter: drop-shadow(0 0 6px rgba(55, 65, 81, 0.4));
        }

        .node.medium {
          fill: #9ca3af;
          stroke: #6b7280;
          filter: drop-shadow(0 0 5px rgba(156, 163, 175, 0.35));
        }

        .edge {
          stroke: rgba(107, 114, 128, 0.4);
          stroke-width: 1;
        }

        .edge.active {
          stroke: rgba(107, 114, 128, 0.7);
          stroke-width: 1.5;
        }

        .pulse {
          animation: pulse 2s ease-in-out infinite;
        }

        @keyframes pulse {
          0%, 100% { transform: scale(1); opacity: 0.8; }
          50% { transform: scale(1.2); opacity: 1; }
        }
      `}</style>
      
      <svg 
        ref={svgRef}
        className="network-svg opacity-80" 
        viewBox="0 0 1200 800"
        preserveAspectRatio="xMidYMid slice"
      >
        {/* Render edges */}
        {isInitialized && edgesRef.current.map((edge, index) => {
          const sourcePos = nodePositions[edge.source];
          const targetPos = nodePositions[edge.target];
          const isActive = activeEdges.has(index);
          const scrollProgress = scrollProgressRef.current;
          const baseOpacity = edge.opacity;
          const scrollOpacity = Math.max(0.1, baseOpacity * (1 + scrollProgress * 2));
          
          if (!sourcePos || !targetPos) return null;
          
          return (
            <line
              key={`edge-${index}`}
              className={`edge ${isActive ? 'active' : ''}`}
              x1={sourcePos.x}
              y1={sourcePos.y}
              x2={targetPos.x}
              y2={targetPos.y}
              style={{ strokeOpacity: scrollOpacity }}
            />
          );
        })}
        
        {/* Render nodes */}
        {isInitialized && nodesRef.current.map((node, index) => {
          const isPulsing = pulsingNodes.has(index);
          const position = nodePositions[index];
          
          if (!position) return null;
          
          return (
            <circle
              key={`node-${index}`}
              className={`node ${node.type} ${isPulsing ? 'pulse' : ''}`}
              cx={position.x}
              cy={position.y}
              r={node.radius}
            />
          );
        })}
      </svg>
    </div>
  );
};
