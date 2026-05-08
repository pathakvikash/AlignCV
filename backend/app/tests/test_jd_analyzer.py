from app.jd_analyzer.jd_analyzer import analyze_job_description


def test_analyze_job_description_extracts_fields() -> None:
    raw_text = """
Senior Software Engineer
Responsibilities:
- Build scalable APIs
- Collaborate with product teams

Required Skills
- Python
- AWS
- Docker
"""
    analysis = analyze_job_description(raw_text)

    assert analysis.role == "Senior Software Engineer"
    assert analysis.seniority == "Senior"
    assert "python" in analysis.skills
    assert "aws" in analysis.tools
    assert "docker" in analysis.tools
    assert any("scalable" in item for item in analysis.responsibilities)
    assert "cloud" not in analysis.keywords or isinstance(analysis.keywords, list)
