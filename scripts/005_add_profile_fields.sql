-- Add currency and avatar_url fields to profiles table
ALTER TABLE public.profiles
ADD COLUMN IF NOT EXISTS currency TEXT DEFAULT 'USD' CHECK (currency IN ('USD', 'CLP')),
ADD COLUMN IF NOT EXISTS avatar_url TEXT;

-- Update existing profiles to have default currency
UPDATE public.profiles
SET currency = 'USD'
WHERE currency IS NULL;
