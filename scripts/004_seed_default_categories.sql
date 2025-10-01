-- This script will be used to seed default categories for a user
-- It should be run after a user signs up and confirms their email
-- For now, we'll create a function that can be called to seed categories

CREATE OR REPLACE FUNCTION public.seed_default_categories(p_user_id UUID)
RETURNS VOID
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  -- Insert default expense categories
  INSERT INTO public.categories (user_id, name, type) VALUES
    (p_user_id, 'Alimentación', 'expense'),
    (p_user_id, 'Transporte', 'expense'),
    (p_user_id, 'Vivienda', 'expense'),
    (p_user_id, 'Servicios', 'expense'),
    (p_user_id, 'Entretenimiento', 'expense'),
    (p_user_id, 'Salud', 'expense'),
    (p_user_id, 'Educación', 'expense'),
    (p_user_id, 'Compras', 'expense'),
    (p_user_id, 'Otros gastos', 'expense')
  ON CONFLICT DO NOTHING;

  -- Insert default income categories
  INSERT INTO public.categories (user_id, name, type) VALUES
    (p_user_id, 'Salario', 'income'),
    (p_user_id, 'Freelance', 'income'),
    (p_user_id, 'Inversiones', 'income'),
    (p_user_id, 'Otros ingresos', 'income')
  ON CONFLICT DO NOTHING;
END;
$$;
