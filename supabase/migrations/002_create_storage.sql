-- Create storage bucket for file uploads
INSERT INTO storage.buckets (id, name, public) VALUES ('piksel-files', 'piksel-files', true);

-- Create storage policies
CREATE POLICY "Allow public read access" ON storage.objects FOR SELECT USING (bucket_id = 'piksel-files');
CREATE POLICY "Allow authenticated users to upload" ON storage.objects FOR INSERT WITH CHECK (bucket_id = 'piksel-files');
CREATE POLICY "Allow authenticated users to update" ON storage.objects FOR UPDATE USING (bucket_id = 'piksel-files');
CREATE POLICY "Allow authenticated users to delete" ON storage.objects FOR DELETE USING (bucket_id = 'piksel-files');
