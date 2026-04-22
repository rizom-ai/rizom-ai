#!/usr/bin/env ruby
require "yaml"

config = YAML.load_file("brain.yaml") || {}
brain_model = config["brain"]
brain_domain = config["domain"]

raise "Missing brain in brain.yaml" if brain_model.nil? || brain_model.to_s.strip.empty?
raise "Missing domain in brain.yaml" if brain_domain.nil? || brain_domain.to_s.strip.empty?

brain_domain = brain_domain.to_s.strip
labels = brain_domain.split(".")
preview_domain = if labels.length >= 3
  labels.dup.tap { |parts| parts[0] = "#{parts[0]}-preview" }.join(".")
else
  "preview.#{brain_domain}"
end

github_env = ENV["GITHUB_ENV"]
raise "Missing GITHUB_ENV" if github_env.nil? || github_env.empty?

instance_name = ENV["INSTANCE_NAME"]
if instance_name.nil? || instance_name.empty?
  instance_name = File.basename(Dir.pwd)
end

registry_username = ENV["GITHUB_REPOSITORY_OWNER"]
raise "Missing GITHUB_REPOSITORY_OWNER" if registry_username.nil? || registry_username.empty?

repository = ENV["GITHUB_REPOSITORY"]
raise "Missing GITHUB_REPOSITORY" if repository.nil? || repository.empty?
repository_name = repository.split("/", 2).last
raise "Missing repository name" if repository_name.nil? || repository_name.empty?

File.open(github_env, "a") do |file|
  file.puts("INSTANCE_NAME=#{instance_name}")
  file.puts("BRAIN_MODEL=#{brain_model}")
  file.puts("BRAIN_DOMAIN=#{brain_domain}")
  file.puts("PREVIEW_DOMAIN=#{preview_domain}")
  file.puts("IMAGE_REPOSITORY=ghcr.io/#{registry_username}/#{repository_name}")
  file.puts("REGISTRY_USERNAME=#{registry_username}")
end
