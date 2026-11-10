# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/)
and this project adheres to [Semantic Versioning](https://semver.org/).

## 1.0.0 - Unreleased

First version after clonning [b-fuse/deno-dom v0.1.56](https://github.com/b-fuze/deno-dom) with modifications.

### Added

- Support for new parsing rules for `<select>`.
- Support for `Node.normalize()`.

### Changed

- Removed Deno dependency and ported to Node.
- Update Rust dependencies to the latest version.
- Simplify the code to output only the WASM version.
