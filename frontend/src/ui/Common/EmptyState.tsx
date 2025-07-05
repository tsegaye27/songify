import React from "react";
import styled from "@emotion/styled";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 4rem 2rem;
  text-align: center;
`;

const Icon = styled.div`
  font-size: 4rem;
  color: var(--accent-color);
  margin-bottom: 1rem;
`;

const Title = styled.h3`
  color: var(--text-color);
  font-size: 1.25rem;
  font-weight: 600;
  margin: 0 0 0.5rem 0;
`;

const Description = styled.p`
  color: var(--text-color-secondary);
  font-size: 0.875rem;
  margin: 0 0 2rem 0;
  max-width: 400px;
`;

const ActionContainer = styled.div`
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
  justify-content: center;
`;

interface EmptyStateProps {
  icon?: React.ReactNode;
  title: string;
  description?: string;
  action?: React.ReactNode;
}

const EmptyState: React.FC<EmptyStateProps> = ({
  icon,
  title,
  description,
  action,
}) => {
  return (
    <Container>
      {icon && <Icon>{icon}</Icon>}
      <Title>{title}</Title>
      {description && <Description>{description}</Description>}
      {action && <ActionContainer>{action}</ActionContainer>}
    </Container>
  );
};

export default EmptyState;
